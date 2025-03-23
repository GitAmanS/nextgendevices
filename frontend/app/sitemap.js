export default async function sitemap() {
    const baseUrl = "https://nextgendevices.tech";
  
    const staticPages = ["", "/about", "/contact"].map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date().toISOString(),
    }));
  
    const blogPosts = await fetch(`${baseUrl}/api/blog`).then((res) => res.json());
  
    const dynamicPages = blogPosts.map((post) => {
      const formattedCategory = post.category.toLowerCase().replace(/\s+/g, "-");
      return {
        url: `${baseUrl}/${formattedCategory}/${post.slug}`,
        lastModified: new Date(post.updatedAt).toISOString(),
      };
    });
  
    return [...staticPages, ...dynamicPages];
  }
  