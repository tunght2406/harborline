import { sanitizeArticleHtml } from "@/lib/html";
import { looksLikeHtml, parseInline, parseMarkdown, type InlineSpan } from "@/lib/markdown";

function Inline({ text }: { text: string }) {
  const spans = parseInline(text);
  return (
    <>
      {spans.map((span, index) => (
        <Span key={index} span={span} />
      ))}
    </>
  );
}

function Span({ span }: { span: InlineSpan }) {
  if (span.type === "strong") return <strong className="font-semibold text-ink">{span.text}</strong>;
  if (span.type === "em") return <em>{span.text}</em>;
  if (span.type === "link") {
    return (
      <a href={span.href} className="underline decoration-line underline-offset-4" rel="noreferrer">
        {span.text}
      </a>
    );
  }
  return <>{span.text}</>;
}

export function ArticleBody({ markdown }: { markdown: string }) {
  if (looksLikeHtml(markdown)) {
    return <div className="article-body" dangerouslySetInnerHTML={{ __html: sanitizeArticleHtml(markdown) }} />;
  }
  const blocks = parseMarkdown(markdown);
  return (
    <div>
      {blocks.map((block, index) => {
        if (block.type === "h2") {
          return (
            <h2 key={index} className="mt-8 font-display text-3xl tracking-tight">
              <Inline text={block.text} />
            </h2>
          );
        }
        if (block.type === "h3") {
          return (
            <h3 key={index} className="mt-6 font-display text-2xl">
              <Inline text={block.text} />
            </h3>
          );
        }
        if (block.type === "ul") {
          return (
            <ul key={index} className="mt-4 list-disc space-y-2 pl-5 text-stone">
              {block.items.map((item) => (
                <li key={item}>
                  <Inline text={item} />
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p key={index} className="mt-4 text-base leading-7 text-stone">
            <Inline text={block.text} />
          </p>
        );
      })}
    </div>
  );
}
