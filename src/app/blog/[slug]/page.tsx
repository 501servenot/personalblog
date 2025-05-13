import type { Metadata } from "next";
import { getBlogPosts } from "@/lib/getblog";
import BlogContent from "./blog-content";

export async function generateMetadata({
  params,
}): Promise<Metadata | undefined> {
  const slug = params.slug;
  let getPost = getBlogPosts();
  if (!getPost) {
    return;
  }
  let post = getPost.find((post) => post.slug === slug);

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata;
  let ogImage = image
    ? process.env.SITE_URL + image
    : process.env.SITE_URL + "/og?title=" + title;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: process.env.SITE_URL + "/blog/" + post.slug,
      images: [
        {
          url: ogImage,
        },
      ],
    },
  };
}

export default async function Blog({ params }) {
  const { slug } = params;
  return (
    <section className="px-1 sm:px-4 md:px-4 lg:px-4 pt-25 w-full max-w-none">
      <BlogContent slug={slug} />
    </section>
  );
}
