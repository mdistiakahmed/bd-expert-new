import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: "https://www.ratgeberltd.com/",
      lastModified: new Date(),
    },
    {
      url: "https://www.ratgeberltd.com/experts",
      lastModified: new Date(),
    },
    {
      url: "https://www.ratgeberltd.com/articles",
      lastModified: new Date(),
    },
  ];
}
