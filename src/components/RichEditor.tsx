"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { uploadImage } from "@/app/admin/actions";
import { markdownToHtml } from "@/lib/markdown";

type Panel = "link" | "image" | null;

function escapeAttr(value: string) {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

function safeUrl(value: string) {
  const trimmed = value.trim();
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  if (/^\/uploads\/[a-zA-Z0-9._-]+$/.test(trimmed)) return trimmed;
  return "";
}

function Tool({
  label,
  pressed,
  onPress,
  children,
}: {
  label: string;
  pressed?: boolean;
  onPress: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-pressed={pressed}
      onMouseDown={(event) => {
        event.preventDefault();
        onPress();
      }}
      className={`grid h-8 min-w-8 place-items-center px-1.5 ${pressed ? "bg-ink text-sand" : "text-ink hover:bg-paper"}`}
    >
      {children}
    </button>
  );
}

export function RichEditor({ initial }: { initial: string }) {
  const editorRef = useRef<HTMLDivElement>(null);
  const hiddenRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const savedRange = useRef<Range | null>(null);
  const [block, setBlock] = useState("p");
  const [marks, setMarks] = useState({ bold: false, italic: false, underline: false, strike: false });
  const [panel, setPanel] = useState<Panel>(null);
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState("");
  const [uploading, setUploading] = useState(false);

  function rememberSelection() {
    const selection = window.getSelection();
    const editor = editorRef.current;
    if (!selection || selection.rangeCount === 0 || !editor) return;
    const range = selection.getRangeAt(0);
    if (editor.contains(range.commonAncestorContainer)) savedRange.current = range.cloneRange();
  }

  function restoreSelection() {
    const range = savedRange.current;
    const editor = editorRef.current;
    if (!range || !editor) return;
    editor.focus();
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
  }

  function sync() {
    const editor = editorRef.current;
    if (hiddenRef.current && editor) hiddenRef.current.value = editor.innerHTML;
    const selection = window.getSelection();
    if (!editor || !selection?.anchorNode || !editor.contains(selection.anchorNode)) return;
    const current = document.queryCommandValue("formatBlock").replace(/[<>]/g, "").toLowerCase();
    setBlock(current === "h2" || current === "h3" || current === "blockquote" ? current : "p");
    setMarks({
      bold: document.queryCommandState("bold"),
      italic: document.queryCommandState("italic"),
      underline: document.queryCommandState("underline"),
      strike: document.queryCommandState("strikeThrough"),
    });
  }

  function run(command: string, value?: string) {
    editorRef.current?.focus();
    document.execCommand(command, false, value);
    sync();
  }

  function applyBlock(value: string) {
    restoreSelection();
    const editor = editorRef.current;
    if (!editor) return;
    editor.focus();
    document.execCommand("formatBlock", false, value);
    const current = document.queryCommandValue("formatBlock").replace(/[<>]/g, "").toLowerCase();
    if (current !== value) document.execCommand("formatBlock", false, `<${value}>`);
    sync();
  }

  function openPanel(next: Panel) {
    rememberSelection();
    setUrl("");
    setStatus("");
    setPanel((current) => (current === next ? null : next));
  }

  function insertHtml(html: string) {
    restoreSelection();
    run("insertHTML", html);
  }

  function applyLink() {
    const href = safeUrl(url);
    if (!href || href.startsWith("/uploads/")) {
      setStatus("Liên kết phải bắt đầu bằng http:// hoặc https://.");
      return;
    }
    restoreSelection();
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) {
      run("insertHTML", `<a href="${escapeAttr(href)}">${escapeAttr(href)}</a>`);
    } else {
      run("createLink", href);
    }
    setPanel(null);
    setUrl("");
    setStatus("");
  }

  function applyImageUrl() {
    const src = safeUrl(url);
    if (!src) {
      setStatus("Dùng liên kết http(s) hoặc tải file ảnh lên.");
      return;
    }
    insertHtml(`<img src="${escapeAttr(src)}" alt="">`);
    setPanel(null);
    setUrl("");
    setStatus("");
  }

  async function onFile(file: File) {
    setUploading(true);
    setStatus("Đang tải ảnh...");
    const data = new FormData();
    data.set("file", file);
    const result = await uploadImage(data);
    setUploading(false);
    if ("error" in result) {
      setStatus(result.error);
      return;
    }
    insertHtml(`<img src="${escapeAttr(result.url)}" alt="">`);
    setPanel(null);
    setStatus("");
  }

  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;
    editor.innerHTML = markdownToHtml(initial);
    if (hiddenRef.current) hiddenRef.current.value = editor.innerHTML;

    const form = editor.closest("form");
    const onSubmit = () => {
      if (hiddenRef.current) hiddenRef.current.value = editor.innerHTML;
    };
    form?.addEventListener("submit", onSubmit, true);

    const onSelection = () => {
      rememberSelection();
      sync();
    };
    document.addEventListener("selectionchange", onSelection);
    return () => {
      form?.removeEventListener("submit", onSubmit, true);
      document.removeEventListener("selectionchange", onSelection);
    };
    // The starting article is fixed for this screen.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initial]);

  return (
    <div className="border border-line bg-paper">
      <input ref={hiddenRef} type="hidden" name="body" />
      <div className="sticky top-0 z-10 border-b border-line bg-sand">
        <div className="flex flex-wrap items-center gap-0.5 px-2 py-1.5">
          <select
            aria-label="Kiểu chữ"
            value={block}
            onMouseDown={rememberSelection}
            onChange={(event) => applyBlock(event.target.value)}
            className="mr-1 h-8 border border-line bg-paper px-2 text-sm outline-none"
          >
            <option value="p">Đoạn văn</option>
            <option value="h2">Tiêu đề</option>
            <option value="h3">Tiêu đề nhỏ</option>
            <option value="blockquote">Trích dẫn</option>
          </select>
          <span className="mx-1 h-5 w-px bg-line" />
          <Tool label="In đậm" pressed={marks.bold} onPress={() => run("bold")}>
            <span className="font-semibold">B</span>
          </Tool>
          <Tool label="In nghiêng" pressed={marks.italic} onPress={() => run("italic")}>
            <span className="italic">I</span>
          </Tool>
          <Tool label="Gạch chân" pressed={marks.underline} onPress={() => run("underline")}>
            <span className="underline">U</span>
          </Tool>
          <Tool label="Gạch ngang" pressed={marks.strike} onPress={() => run("strikeThrough")}>
            <span className="line-through">S</span>
          </Tool>
          <span className="mx-1 h-5 w-px bg-line" />
          <Tool label="Danh sách" onPress={() => run("insertUnorderedList")}>
            <ListIcon />
          </Tool>
          <Tool label="Danh sách số" onPress={() => run("insertOrderedList")}>
            <span className="text-xs tracking-tight">1.</span>
          </Tool>
          <Tool label="Căn trái" onPress={() => run("justifyLeft")}>
            <AlignIcon side="left" />
          </Tool>
          <Tool label="Căn giữa" onPress={() => run("justifyCenter")}>
            <AlignIcon side="center" />
          </Tool>
          <Tool label="Căn phải" onPress={() => run("justifyRight")}>
            <AlignIcon side="right" />
          </Tool>
          <span className="mx-1 h-5 w-px bg-line" />
          <Tool label="Liên kết" pressed={panel === "link"} onPress={() => openPanel("link")}>
            <span className="text-xs">Link</span>
          </Tool>
          <Tool label="Chèn ảnh" pressed={panel === "image"} onPress={() => openPanel("image")}>
            <span className="text-xs">Ảnh</span>
          </Tool>
          <Tool label="Xóa định dạng" onPress={() => run("removeFormat")}>
            <span className="text-xs">Tx</span>
          </Tool>
        </div>
        {panel ? (
          <div className="flex flex-wrap items-center gap-2 border-t border-line px-2 py-2">
            {panel === "image" ? (
              <>
                <button
                  type="button"
                  disabled={uploading}
                  onMouseDown={(event) => {
                    event.preventDefault();
                    rememberSelection();
                    fileRef.current?.click();
                  }}
                  className="h-9 border border-line bg-paper px-3 text-sm disabled:opacity-60"
                >
                  Tải ảnh lên
                </button>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  className="hidden"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    event.target.value = "";
                    if (file) void onFile(file);
                  }}
                />
              </>
            ) : null}
            <input
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              placeholder={panel === "link" ? "https://lien-ket" : "https://đường-dẫn-ảnh"}
              className="h-9 min-w-56 flex-1 border border-line bg-paper px-3 text-sm outline-none focus:border-ink"
            />
            <button
              type="button"
              disabled={uploading}
              onMouseDown={(event) => {
                event.preventDefault();
                if (panel === "link") applyLink();
                else applyImageUrl();
              }}
              className="h-9 bg-ink px-3 text-sm text-sand disabled:opacity-60"
            >
              Chèn
            </button>
            {panel === "link" ? (
              <button
                type="button"
                onMouseDown={(event) => {
                  event.preventDefault();
                  restoreSelection();
                  run("unlink");
                  setPanel(null);
                }}
                className="h-9 px-2 text-sm text-stone"
              >
                Bỏ liên kết
              </button>
            ) : null}
            {status ? <span className="text-sm text-copper">{status}</span> : null}
          </div>
        ) : null}
      </div>
      <div
        ref={editorRef}
        data-editor
        contentEditable
        role="textbox"
        aria-multiline="true"
        aria-label="Nội dung bài viết"
        spellCheck
        onInput={sync}
        onFocus={() => document.execCommand("defaultParagraphSeparator", false, "p")}
        className="editor-surface px-4 py-4"
        suppressContentEditableWarning
      />
    </div>
  );
}

function ListIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" fill="currentColor">
      <circle cx="2.5" cy="4" r="1" />
      <circle cx="2.5" cy="8" r="1" />
      <circle cx="2.5" cy="12" r="1" />
      <rect x="5" y="3.2" width="9" height="1.4" />
      <rect x="5" y="7.2" width="9" height="1.4" />
      <rect x="5" y="11.2" width="9" height="1.4" />
    </svg>
  );
}

function AlignIcon({ side }: { side: "left" | "center" | "right" }) {
  const widths = side === "center" ? [10, 14, 8] : side === "right" ? [8, 14, 10] : [14, 10, 14];
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" fill="currentColor">
      {widths.map((width, index) => {
        const x = side === "right" ? 14 - width : side === "center" ? (16 - width) / 2 : 1;
        return <rect key={index} x={x} y={3 + index * 4} width={width} height="1.4" />;
      })}
    </svg>
  );
}
