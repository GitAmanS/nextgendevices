export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    return {
      rules: [
        {
          userAgent: "*",
          allow: ["/", "/:category", "/:category/:blog"],
          disallow: ["/dashboard"],
        },
      ],
      sitemap: `${baseUrl}/sitemap.xml`,
    };
  }
  