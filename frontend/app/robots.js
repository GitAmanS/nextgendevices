export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://nextgendevices.tech";
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
  