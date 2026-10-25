export type MarkdownBlock =
  | { type: "h2" | "h3" | "p"; text: string }
  | { type: "ul"; items: string[] };

export type InlineSpan =
  | { type: "text" | "strong" | "em"; text: string }
  | { type: "link"; text: string; href: string };

export function parseMarkdown(source: string): MarkdownBlock[] {
  const chunks = source.replace(/\r\n/g, "\n").trim().split(/\n{2,}/);
  const blocks: MarkdownBlock[] = [];
  for (const chunk of chunks) {
    const lines = chunk.split("\n").map((line) => line.trim()).filter(Boolean);
    if (lines.length === 0) continue;
    if (lines.every((line) => /^[-*] /.test(line))) {
      blocks.push({ type: "ul", items: lines.map((line) => line.replace(/^[-*] /, "")) });
      continue;
    }
    const line = lines.join(" ");
    if (line.startsWith("### ")) blocks.push({ type: "h3", text: line.slice(4) });
    else if (line.startsWith("## ")) blocks.push({ type: "h2", text: line.slice(3) });
    else if (line.startsWith("# ")) blocks.push({ type: "h2", text: line.slice(2) });
    else blocks.push({ type: "p", text: line });
  }
  return blocks;
}

export function parseInline(input: string): InlineSpan[] {
  const spans: InlineSpan[] = [];
  const pattern = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*/g;
  let last = 0;
  for (const match of input.matchAll(pattern)) {
    const index = match.index ?? 0;
    if (index > last) spans.push({ type: "text", text: input.slice(last, index) });
    if (match[1] && match[2]) spans.push({ type: "link", text: match[1], href: match[2] });
    else if (match[3]) spans.push({ type: "strong", text: match[3] });
    else if (match[4]) spans.push({ type: "em", text: match[4] });
    last = index + match[0].length;
  }
  if (last < input.length) spans.push({ type: "text", text: input.slice(last) });
  return spans;
}

export function looksLikeHtml(value: string) {
  return /<\/?[a-z][\s\S]*>/i.test(value);
}

function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function inlineToHtml(text: string) {
  return parseInline(text)
    .map((span) => {
      const safe = escapeHtml(span.text);
      if (span.type === "strong") return `<strong>${safe}</strong>`;
      if (span.type === "em") return `<em>${safe}</em>`;
      if (span.type === "link") return `<a href="${escapeHtml(span.href)}">${safe}</a>`;
      return safe;
    })
    .join("");
}

export function markdownToHtml(source: string) {
  if (!source.trim()) return "<p><br></p>";
  if (looksLikeHtml(source)) return source;
  return parseMarkdown(source)
    .map((block) => {
      if (block.type === "h2") return `<h2>${inlineToHtml(block.text)}</h2>`;
      if (block.type === "h3") return `<h3>${inlineToHtml(block.text)}</h3>`;
      if (block.type === "ul") return `<ul>${block.items.map((item) => `<li>${inlineToHtml(item)}</li>`).join("")}</ul>`;
      return `<p>${inlineToHtml(block.text)}</p>`;
    })
    .join("");
}
