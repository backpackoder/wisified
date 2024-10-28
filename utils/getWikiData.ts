// Utils
import { getTextOnWikipediaFormat } from "./getTextOnWikipediaFormat";

// Types
import { wikiSearch, wikiSummary } from "@/types/wikiResponse";

const wiki = require("wikipedia");

export async function getWikiData(author: string) {
  const authorOnWikipediaFormat = getTextOnWikipediaFormat(author);

  try {
    const summaryWithoutPage: wikiSummary = await wiki.summary(authorOnWikipediaFormat);

    return summaryWithoutPage;
  } catch (error) {
    console.log(error);
  }
}

export async function getWikiSearch(author: string) {
  const authorOnWikipediaFormat = getTextOnWikipediaFormat(author);

  try {
    const summaryWithoutPage: wikiSearch = await wiki.search(authorOnWikipediaFormat);

    return summaryWithoutPage;
  } catch (error) {
    console.log(error);
  }
}
