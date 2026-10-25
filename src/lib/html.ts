import sanitizeHtml from "sanitize-html";

export function sanitizeArticleHtml(dirty: string) {
  return sanitizeHtml(dirty, {
    allowedTags: [
      "p",
      "br",
      "div",
      "strong",
      "b",
      "em",
      "i",
      "u",
      "s",
      "h2",
      "h3",
      "ul",
      "ol",
      "li",
      "a",
      "img",
      "blockquote",
    ],
    allowedAttributes: {
      a: ["href", "rel"],
      img: ["src", "alt"],
      p: ["style"],
      div: ["style"],
      h2: ["style"],
      h3: ["style"],
      li: ["style"],
      blockquote: ["style"],
    },
    allowedStyles: {
      "*": {
        "text-align": [/^left$/, /^right$/, /^center$/],
      },
    },
    allowedSchemes: ["http", "https"],
    allowProtocolRelative: false,
    exclusiveFilter: (frame) => {
      if (frame.tag === "img") return !frame.attribs.src;
      if (frame.tag === "a") return !frame.attribs.href;
      return false;
    },
    transformTags: {
      b: "strong",
      i: "em",
      strike: "s",
      a: (_tagName, attribs) => ({
        tagName: "a",
        attribs: {
          href: attribs.href,
          rel: "noreferrer",
        },
      }),
    },
  });
}

export function articlePlainText(html: string) {
  return sanitizeArticleHtml(html)
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
