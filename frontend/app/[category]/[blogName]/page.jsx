import Head from "next/head";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ShareButtons from "@/components/ShareButtons";

const BaseApi = process.env.NEXT_PUBLIC_API;

const AD_CONFIG = {
  MIN_INTERVAL: parseInt(process.env.NEXT_PUBLIC_AD_MIN_INTERVAL) || 2,
  MAX_INTERVAL: parseInt(process.env.NEXT_PUBLIC_AD_MAX_INTERVAL) || 3,
  START_BUFFER: parseInt(process.env.NEXT_PUBLIC_AD_START_BUFFER) || 1,
  END_BUFFER: parseInt(process.env.NEXT_PUBLIC_AD_END_BUFFER) || 2,
};

export async function generateStaticParams() {
  const res = await fetch(`${BaseApi}/blogs`);
  const blogs = await res.json();
  return blogs.map((blog) => ({ blogName: blog.slug }));
}

const getRandomInterval = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const AdComponent = ({ id }) => (
  <div
    key={`ad-${id}`}
    className="my-8 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg text-center"
  >
    <p className="text-gray-600 dark:text-gray-300">Advertisement #{id}</p>
    <small className="text-xs text-gray-400">Ad placeholder</small>
  </div>
);

export async function generateMetadata({ params }) {
  const { blogName } = params;
  const res = await fetch(`${BaseApi}/blogs/${blogName}`, {
    next: { tags: [`blog-${blogName}`] },
  });
  
  if (!res.ok) return { title: "Blog Not Found" };

  const blog = await res.json();
  const categorySlug = blog.category.toLowerCase().replace(/\s+/g, "-");
  
  return {
    title: blog.title,
    description: blog.metaDescription || blog.excerpt,
    keywords: blog.metaKeywords?.join(", "),
    openGraph: {
      title: blog.title,
      description: blog.metaDescription,
      images: [{ url: blog.featuredImage }],
      type: "article",
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/${categorySlug}/${blog.slug}`,
    },
  };
}

export default async function BlogPage({ params }) {
  const { blogName } = params;
  const res = await fetch(`${BaseApi}/blogs/${blogName}`, {
    next: { tags: [`blog-${blogName}`] },
  });

  if (!res.ok) {
    return (
      <div className="text-center text-2xl font-semibold mt-10">
        Blog not found
      </div>
    );
  }

  const blog = await res.json();
  const categorySlug = blog.category.toLowerCase().replace(/\s+/g, "-");
  const currentUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/${categorySlug}/${blogName}`;

  const paragraphs = blog.content?.split("</p>").filter((p) => p.trim()) || [];
  const contentWithAds = [];
  let adCounter = 0;
  let currentCount = 0;
  let nextAdAt = getRandomInterval(
    AD_CONFIG.MIN_INTERVAL,
    AD_CONFIG.MAX_INTERVAL
  );

  paragraphs.forEach((paragraph, index) => {
    const paragraphHtml = `${paragraph}</p>`;
    contentWithAds.push(
      <div
        key={`para-${index}`}
        dangerouslySetInnerHTML={{ __html: paragraphHtml }}
      />
    );

    if (index < AD_CONFIG.START_BUFFER) return;
    if (index >= paragraphs.length - AD_CONFIG.END_BUFFER) return;

    currentCount++;

    // if (currentCount === nextAdAt) {
    //   contentWithAds.push(<AdComponent key={`ad-${adCounter}`} id={++adCounter} />);
    //   currentCount = 0;
    //   nextAdAt = getRandomInterval(
    //     AD_CONFIG.MIN_INTERVAL,
    //     AD_CONFIG.MAX_INTERVAL
    //   );
    // }
  });

  return (
    <>
      <Header />
      <div className="px-6 md:pl-40 md:pr-80 py-8">
        <Head>
          <link rel="stylesheet" href="/blog-styles.css" />
        </Head>

        <article className="prose prose-lg sm:prose-xl dark:prose-invert max-w-none">
          <header className="mb-12">
            <h1 className="font-montserrat text-xl md:text-[41px] font-bold mb-4 leading-tight">
              {blog.title}
            </h1>
            <div className="flex text-sm font-[300] items-center text-[#2b2b2b] dark:text-gray-300 space-x-1">
              <span className="capitalize">By {blog.author.username}</span>
              <span>
                Published{" "}
                {formatDistanceToNow(new Date(blog.createdAt), {
                  addSuffix: true,
                })}
              </span>
              <span>•</span>
              <span>{blog.views} views</span>
            </div>
            <ShareButtons url={currentUrl} />
          </header>
          
          <div className="w-full my-4 mb-8 md:mb-12 aspect-[16/9] bg-black relative">
            <Image
              fill
              src={blog.featuredImage}
              alt={blog.title}
              className="object-cover z-10 shadow-lg"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          <div className="content prose prose-lg font-montserrat max-w-4xl mx-auto pb-8 dark:prose-invert">
            {contentWithAds}
          </div>

          <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-sm font-medium">
                {blog.category}
              </span>
              {blog.tags?.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </footer>
        </article>
      </div>
      <Footer />
    </>
  );
}