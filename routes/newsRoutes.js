import express from "express";
import { fetchRSS } from "../services/rssService.js";
import { scrapeArticle } from "../services/scraperService.js";
import puterAIService from "../services/aiService.js"; // <-- new

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const rssItems = await fetchRSS();

    const fullArticles = await Promise.all(
      rssItems.slice(0, 5).map(async (item) => {
        const { content: scrapedContent, image } = await scrapeArticle(item.link);

        const aiContent = scrapedContent ? await puterAIService.rewriteArticle(scrapedContent) : null;

        return {
          title: item.title,
          shortDescription: item.shortDescription,
          publishDate: item.publishDate,
          timeAgo: getTimeAgo(item.publishDate),
          image,
          fullContent: aiContent || scrapedContent || item.shortDescription
        };
      })
    );

    res.json(fullArticles);
  } catch (error) {
    console.log("News Route Error:", error.message);
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

export default router;

function getTimeAgo(pubDate) {
  const diff = Date.now() - new Date(pubDate).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 60) return `${minutes} minutes ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hours ago`;
  const days = Math.floor(hours / 24);
  return `${days} days ago`;
}
