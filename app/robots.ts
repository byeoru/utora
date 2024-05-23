import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      disallow: ["/login", "/signup", "/me", "/api/", "/notice"],
    },
    sitemap: "https://utora.vercel.app/sitemap.xml",
  };
}
