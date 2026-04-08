const FEEDS = [
  { url: "https://www.billboard.com/feed/", source: "Billboard", category: "music" },
  { url: "https://www.rollingstone.com/music/feed/", source: "Rolling Stone", category: "music" },
  { url: "https://variety.com/feed/", source: "Variety", category: "entertainment" },
  { url: "https://deadline.com/feed/", source: "Deadline", category: "entertainment" },
  { url: "https://www.musicbusinessworldwide.com/feed/", source: "Music Business Worldwide", category: "business" },
  { url: "https://www.hollywoodreporter.com/feed/", source: "The Hollywood Reporter", category: "entertainment" },
  { url: "https://www.adweek.com/feed/", source: "Adweek", category: "media" },
  { url: "https://hypebeast.com/feed", source: "Hypebeast", category: "music" },
];

const MAX_PER_FEED = 5;
const MAX_TOTAL = 60;

function parseItems(xml, source, category) {
  const items = [];
  const itemRegex = /<item[\s>]([\s\S]*?)<\/item>/gi;
  let match;
  let count = 0;

  while ((match = itemRegex.exec(xml)) !== null && count < MAX_PER_FEED) {
    const block = match[1];

    const titleMatch = block.match(/<title><!\[CDATA\[([\s\S]*?)\]\]><\/title>/) ||
                       block.match(/<title>([\s\S]*?)<\/title>/);
    const linkMatch = block.match(/<link><!\[CDATA\[([\s\S]*?)\]\]><\/link>/) ||
                      block.match(/<link>([\s\S]*?)<\/link>/);
    const descMatch = block.match(/<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/) ||
                      block.match(/<description>([\s\S]*?)<\/description>/);
    const dateMatch = block.match(/<pubDate>([\s\S]*?)<\/pubDate>/);

    const title = titleMatch ? titleMatch[1].replace(/<[^>]*>/g, "").trim() : "";
    const link = linkMatch ? linkMatch[1].trim() : "";
    const description = descMatch ? descMatch[1].replace(/<[^>]*>/g, "").trim() : "";
    const pubDate = dateMatch ? dateMatch[1].trim() : "";

    if (title) {
      items.push({ title, link, description, pubDate, source, category });
      count++;
    }
  }

  return items;
}

export default async (req) => {
  const url = new URL(req.url);
  const catFilter = (url.searchParams.get("cat") || "").toLowerCase();

  const feedsToFetch = catFilter && catFilter !== "all"
    ? FEEDS.filter((f) => f.category === catFilter)
    : FEEDS;

  const results = await Promise.allSettled(
    feedsToFetch.map(async (feed) => {
      const res = await fetch(feed.url, {
        signal: AbortSignal.timeout(6000),
        headers: { "User-Agent": "LSMG-News-Proxy/1.0" },
      });
      if (!res.ok) return [];
      const xml = await res.text();
      return parseItems(xml, feed.source, feed.category);
    })
  );

  let articles = [];
  for (const r of results) {
    if (r.status === "fulfilled" && Array.isArray(r.value)) {
      articles.push(...r.value);
    }
  }

  articles.sort((a, b) => {
    const da = new Date(a.pubDate).getTime() || 0;
    const db = new Date(b.pubDate).getTime() || 0;
    return db - da;
  });

  articles = articles.slice(0, MAX_TOTAL);

  return new Response(
    JSON.stringify({ ok: true, articles, fetchedAt: new Date().toISOString() }),
    {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=180",
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
};
