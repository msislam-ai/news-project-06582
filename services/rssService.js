import Parser from "rss-parser";
const parser = new Parser();

export async function fetchRSS() {
  try {
    const feed = await parser.parseURL("https://www.prothomalo.com/feed");

    return feed.items.map(item => ({
      title: item.title,
      shortDescription: item.contentSnippet,
      link: item.link,
      publishDate: item.pubDate
    }));
  } catch (error) {
    console.log("RSS Error:", error.message);
    return [];
  }
}
