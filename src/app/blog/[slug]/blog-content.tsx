import Link from "next/link";
import { notFound } from "next/navigation";
import { slugify, mdxComponents } from "@/components/custommdx";
import { getBlogPosts } from "@/lib/getblog";
import TOC from "./toc";
import { ChevronLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import React from "react";

interface Heading {
  level: number;
  id: string;
  text: string;
}

function extractHeadings(source: string) {
  const headings: Heading[] = [];

  const cleanedSource = source.replace(/```[\s\S]*?```/g, "");

  const headingRegex = /^(#{1,6})\s+(.*)$/gm;
  let match: string[] | null;

  while ((match = headingRegex.exec(cleanedSource)) !== null) {
    const level = match[1].length;
    let text = match[2].trim();

    text = text.replace(/\*\*(.*?)\*\*/g, "$1");

    const id = slugify(text);
    headings.push({ level, id, text });
  }
  return headings;
}

export default async function BlogContent({ slug }: { slug: string }) {
  const getPost = getBlogPosts();

  if (!getPost) {
    notFound();
  }
  let post = getPost.find((post) => post.slug === slug);

  if (!post) {
    notFound();
  }
  const headings = extractHeadings(post.content);
  return (
    <>
      <h1 className="mb-2 text-2xl font-medium tracking-tighter transition-opacity hover:opacity-50">
        <Link
          style={{
            viewTransitionName: post.metadata.title,
          }}
          href={"/blog"}
          className="flex items-center justify-start"
        >
          <ChevronLeft />
          {post.metadata.title}
        </Link>
      </h1>
      <div className="mb-8 mt-2 flex max-w-[650px] items-center justify-between text-sm">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {formatDate(post.metadata.publishedAt)}
        </p>
      </div>
      <div className="flex w-full flex-col">
        {post.metadata.image && (
          <div
            className={
              "z-20 overflow-hidden rounded-xl transition-all duration-300 sm:my-20 sm:scale-150 dark:brightness-75 dark:hover:brightness-100"
            }
          >
            <img
              alt={""}
              src={post.metadata.image}
              width={1920}
              height={1080}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        )}
      </div>
      <article className="prose prose-neutral prose-headings:font-semibold prose-code:text-pink-500 prose-pre:bg-gray-800 prose-pre:p-0 text-[15px] text-gray-300 dark:prose-invert max-w-6xl w-full leading-relaxed">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ node, ...props }) => {
              const text = String(props.children);
              const id = slugify(text);
              return (
                <h1 id={id} className="text-3xl font-bold my-4" {...props} />
              );
            },
            h2: ({ node, ...props }) => {
              const text = String(props.children);
              const id = slugify(text);
              return (
                <h2 id={id} className="text-2xl font-bold my-3" {...props} />
              );
            },
            h3: ({ node, ...props }) => {
              const text = String(props.children);
              const id = slugify(text);
              return (
                <h3 id={id} className="text-xl font-bold my-2" {...props} />
              );
            },
            h4: ({ node, ...props }) => {
              const text = String(props.children);
              const id = slugify(text);
              return (
                <h4 id={id} className="text-lg font-bold my-2" {...props} />
              );
            },
            h5: ({ node, ...props }) => {
              const text = String(props.children);
              const id = slugify(text);
              return (
                <h5 id={id} className="text-base font-bold my-1" {...props} />
              );
            },
            h6: ({ node, ...props }) => {
              const text = String(props.children);
              const id = slugify(text);
              return (
                <h6 id={id} className="text-sm font-bold my-1" {...props} />
              );
            },
            code: mdxComponents.code,
            a: ({ node, ...props }) => (
              <a
                className="font-bold underline text-white hover:opacity-80"
                {...props}
              />
            ),
            table: ({ node, ...props }) => (
              <table
                className="border-collapse table-auto w-full my-4"
                {...props}
              />
            ),
            th: ({ node, ...props }) => (
              <th
                className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left"
                {...props}
              />
            ),
            td: ({ node, ...props }) => (
              <td
                className="border border-gray-300 dark:border-gray-700 px-4 py-2"
                {...props}
              />
            ),
            ul: ({ node, ...props }) => (
              <ul className="list-disc pl-5 my-4" {...props} />
            ),
            ol: ({ node, ...props }) => (
              <ol className="list-decimal pl-5 my-4" {...props} />
            ),
            li: ({ node, ...props }) => <li className="my-1" {...props} />,
            blockquote: ({ node, ...props }) => (
              <blockquote
                className="border-l-4 border-gray-300 dark:border-gray-700 pl-4 my-4 italic"
                {...props}
              />
            ),
            // 自定义图片组件
            img: mdxComponents.img,
            // 自定义段落组件
            p: ({ children, ...props }) => {
              // 检查是否只包含图片
              const childrenArray = React.Children.toArray(children);
              const onlyHasImg =
                childrenArray.length === 1 &&
                React.isValidElement(childrenArray[0]) &&
                (childrenArray[0] as React.ReactElement).type === "img";

              // 如果只包含图片，使用 div 代替 p
              if (onlyHasImg) {
                return <div {...props}>{children}</div>;
              }

              return (
                <p className="my-6 indent-8 text-gray-300 leading-7" {...props}>
                  {children}
                </p>
              );
            },
          }}
        >
          {post.content}
        </ReactMarkdown>
      </article>
      <TOC headings={headings} />
    </>
  );
}

function formatDate(date: string) {
  if (!date.includes("T")) {
    date = `${date}T00:00:00`;
  }

  let fullDate = new Date(date).toLocaleString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return `${fullDate}`;
}
