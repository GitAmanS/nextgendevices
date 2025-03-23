export default async function sitemap() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const backendUrl = process.env.NEXT_PUBLIC_API || "http://localhost:3001/api";

    const staticPages = ["", "/about", "/contact"].map((path) => ({
        url: `${baseUrl}${path}`,
        lastModified: new Date().toISOString(),
    }));

    try {
        const blogPosts = await fetch(`${backendUrl}/blogs`).then((res) => res.json());

        const dynamicPages = blogPosts.map((post) => {
            const categorySlug = post.category.toLowerCase().replace(/\s+/g, "-");
            return {
                url: `${baseUrl}/${categorySlug}/${post.slug}`,
                lastModified: new Date(post.updatedAt).toISOString(),
            };
        });

        return [...staticPages, ...dynamicPages];
    } catch (error) {
        console.error("❌ Error fetching blog posts for sitemap:", error);
        return staticPages; 
    }
}
