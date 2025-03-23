export default function robots() {
    return {
      rules: [
        {
          userAgent: "*",
          allow: ["/", "/:category", "/:category/:blog"],
          disallow: ["/dashboard"],
        },
      ],
      sitemap: "https://nextgendevices.tech/sitemap.xml",
    };
  }
  