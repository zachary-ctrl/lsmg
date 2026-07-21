import TurndownService from "turndown";

const NON_CONTENT_ELEMENTS = [
  "script",
  "style",
  "nav",
  "footer",
  "header",
  "aside",
  "noscript",
  "template",
  "svg",
  "canvas",
];

const NON_CONTENT_ROLES = ["banner", "contentinfo", "navigation", "complementary"];
const NON_CONTENT_NAMES = [
  "sidebar",
  "site-nav",
  "navigation",
  "cookie",
  "modal",
  "drawer",
  "breadcrumb",
  "pagination",
  "social-share",
];

function stripElement(html, tagName) {
  return html.replace(
    new RegExp(`<${tagName}\\b[^>]*>[\\s\\S]*?<\\/${tagName}>`, "gi"),
    "",
  );
}

function stripElementsByAttribute(html, attribute, values) {
  const valuePattern = values.join("|");
  const elementPattern = new RegExp(
    `<([a-z][a-z0-9-]*)\\b(?=[^>]*\\b${attribute}=["'][^"']*(?:${valuePattern})[^"']*["'])[^>]*>[\\s\\S]*?<\\/\\1>`,
    "gi",
  );

  return html.replace(elementPattern, "");
}

function extractContent(html) {
  let cleanedHtml = html.replace(/<!--[\s\S]*?-->/g, "");

  for (const tagName of NON_CONTENT_ELEMENTS) {
    cleanedHtml = stripElement(cleanedHtml, tagName);
  }

  cleanedHtml = stripElementsByAttribute(cleanedHtml, "role", NON_CONTENT_ROLES);
  cleanedHtml = stripElementsByAttribute(cleanedHtml, "(?:class|id)", NON_CONTENT_NAMES);

  const main = cleanedHtml.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i);
  if (main) return main[1];

  const article = cleanedHtml.match(/<article\b[^>]*>([\s\S]*?)<\/article>/i);
  if (article) return article[1];

  const body = cleanedHtml.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i);
  return body?.[1] ?? cleanedHtml;
}

// Test: curl -H "Accept: text/markdown" https://your-site.netlify.app/path
// Add or remove content paths in the markdown edge_functions entries in netlify.toml.
// Test locally by running `netlify dev`, then curl the matching local URL with the same Accept header.
export default async (request, context) => {
  const acceptsMarkdown = request.headers
    .get("accept")
    ?.toLowerCase()
    .includes("text/markdown");

  if (!acceptsMarkdown || !["GET", "HEAD"].includes(request.method)) {
    return context.next();
  }

  const originResponse = await context.next();
  const fallbackResponse = originResponse.clone();

  try {
    const contentType = originResponse.headers.get("content-type") ?? "";
    if (!contentType.toLowerCase().includes("text/html")) {
      return originResponse;
    }

    const html = await originResponse.text();
    const turndown = new TurndownService({
      bulletListMarker: "-",
      codeBlockStyle: "fenced",
      headingStyle: "atx",
    });
    const markdown = turndown.turndown(extractContent(html)).trim();
    const headers = new Headers({
      "Content-Type": "text/markdown; charset=utf-8",
      "X-Markdown-Tokens": String(Math.ceil(markdown.length / 4)),
      "Content-Signal": "ai-train=yes, search=yes, ai-input=yes",
      "Vary": "Accept",
    });

    return new Response(request.method === "HEAD" ? null : markdown, {
      status: originResponse.status,
      statusText: originResponse.statusText,
      headers,
    });
  } catch (error) {
    console.error("Markdown conversion failed", error);
    return fallbackResponse;
  }
};
