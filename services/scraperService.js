import axios from "axios";
import * as cheerio from "cheerio";

export async function scrapeArticle(url) {
  try {
    const { data } = await axios.get(url, {
      headers: { "User-Agent": "Mozilla/5.0" },
      timeout: 15000
    });

    const $ = cheerio.load(data);

    // Extract full article text
    let content = "";
    $(".story-element-text, .article-content p").each((i, el) => {
      content += $(el).text() + "\n";
    });

    // Extract main image
    const image = $("meta[property='og:image']").attr("content") || null;

    return { content: content.trim() || null, image };
  } catch (error) {
    console.log("Scrape error:", error.message, "URL:", url);
    return { content: null, image: null };
  }
}
