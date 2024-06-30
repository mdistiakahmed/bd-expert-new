import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {


    return [
        {
            url: 'https://www.bdtaxexpert.com/',
            lastModified: new Date(),
        }, 
        {
            url: 'https://www.bdtaxexpert.com/experts',
            lastModified: new Date(),
        },
        {
            url: 'https://www.bdtaxexpert.com/articles',
            lastModified: new Date(),
        }
    ]  
}