import Link from "next/link";
import React from "react";
import BlogImage from "./blog-image";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

// Table 组件保持不变
function Table({
  data,
}: {
  data: { headers: string[]; rows: (string | number)[][] };
}) {
  let headers = data.headers.map((header, index) => (
    <th key={index}>{header}</th>
  ));
  let rows = data.rows.map((row, index) => (
    <tr key={index}>
      {row.map((cell, cellIndex) => (
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  ));

  return (
    <table>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

// 链接组件保持不变
function CustomLink(props) {
  let href = props.href;

  if (href.startsWith("/")) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    );
  }

  if (href.startsWith("#")) {
    return <a {...props} />;
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
}

// 图片组件保持不变
async function CenterImage(props: { src: string; alt: string }) {
  const { src, alt } = props;
  return <BlogImage src={src} alt={alt} />;
}

// Callout, ProsCard, ConsCard 组件保持不变
function Callout(props) {
  return (
    <div className="mb-8 flex items-center rounded border border-neutral-200 bg-neutral-50 p-1 px-4 py-3 text-sm text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100">
      <div className="mr-4 flex w-4 items-center">{props.emoji}</div>
      <div className="callout w-full">{props.children}</div>
    </div>
  );
}

function ProsCard({ title, pros }) {
  return (
    <div className="my-4 w-full rounded-xl border border-emerald-200 bg-neutral-50 p-6 dark:border-emerald-900 dark:bg-neutral-900">
      <span>{`${title}`}</span>
      <div className="mt-4">
        {pros.map((pro) => (
          <div key={pro} className="mb-2 flex items-baseline font-medium">
            <div className="mr-2 h-4 w-4">
              <svg className="h-4 w-4 text-emerald-500" viewBox="0 0 24 24">
                <g
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                  <path d="M22 4L12 14.01l-3-3" />
                </g>
              </svg>
            </div>
            <span>{pro}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ConsCard({ title, cons }) {
  return (
    <div className="my-6 w-full rounded-xl border border-red-200 bg-neutral-50 p-6 dark:border-red-900 dark:bg-neutral-900">
      <span>{`You might not use ${title} if...`}</span>
      <div className="mt-4">
        {cons.map((con) => (
          <div key={con} className="mb-2 flex items-baseline font-medium">
            <div className="mr-2 h-4 w-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4 text-red-500"
              >
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            </div>
            <span>{con}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// 简化标题组件，确保返回纯粹的标准 HTML 标签
function createHeading(level: number) {
  return function Heading({
    children,
    ...props
  }: {
    children: React.ReactNode;
  }) {
    const Tag = `h${level}` as keyof React.JSX.IntrinsicElements;
    const text = extractTextFromChildren(children);
    const id = slugify(text);

    return (
      <Tag id={id} {...props}>
        {children}
      </Tag>
    );
  };
}

// 辅助函数：从 React 子元素中提取文本
function extractTextFromChildren(children: React.ReactNode): string {
  if (typeof children === "string") return children;
  if (typeof children === "number") return String(children);
  if (!children) return "";

  if (Array.isArray(children)) {
    return children.map(extractTextFromChildren).join("");
  }

  if (React.isValidElement(children)) {
    const childrenProps = children.props as any;
    if (childrenProps.children) {
      return extractTextFromChildren(childrenProps.children);
    }
  }

  return "";
}

// 优化代码块组件，确保正确渲染行内代码和代码块
function Code({ children, className, ...props }) {
  const match = /language-(\w+)/.exec(className || "");

  if (match) {
    // 代码块
    return (
      <SyntaxHighlighter
        style={oneDark}
        language={match[1]}
        PreTag="pre"
        className="rounded-md" // 保持这个类，可以添加其他基础样式
        customStyle={{
          overflowX: "auto", // 允许水平滚动
          // 针对 WebKit 浏览器 (Chrome, Safari, Edge) 隐藏滚动条
          "::webkitscrollbar": {
            display: "none",
          },
          // 针对 Firefox 隐藏滚动条
          scrollbarWidth: "none",
          // 针对 IE/Edge (旧版) 隐藏滚动条
          msOverflowStyle: "none",
        }}
        {...props}
      >
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    );
  }

  // 行内代码
  return (
    <code className={`${className || ""} font-mono text-sm px-1`} {...props}>
      {children}
    </code>
  );
}

// 优化 slugify 函数
export function slugify(str: string): string {
  if (!str) return "";
  return str
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/&/g, "-and-")
    .replace(/--+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// 添加段落组件，确保返回标准的 <p> 标签
function Paragraph({ children, ...props }) {
  const childrenArray = React.Children.toArray(children);
  const onlyHasImage =
    childrenArray.length === 1 &&
    React.isValidElement(childrenArray[0]) &&
    ((childrenArray[0] as React.ReactElement).type === BlogImage ||
      (childrenArray[0] as React.ReactElement).type === CenterImage ||
      ((childrenArray[0] as React.ReactElement).type as any).name?.includes(
        "Image"
      ));

  if (onlyHasImage) {
    return <div {...props}>{children}</div>;
  }
  return <p {...props}>{children}</p>;
}

// 添加列表组件，确保返回标准的 <ul> 和 <li> 标签
function UnorderedList({ children, ...props }) {
  return <ul {...props}>{children}</ul>;
}

function OrderedList({ children, ...props }) {
  return <ol {...props}>{children}</ol>;
}

function ListItem({ children, ...props }) {
  return <li {...props}>{children}</li>;
}

// 添加引用块组件，确保返回标准的 <blockquote> 标签
function BlockQuote({ children, ...props }) {
  return <blockquote {...props}>{children}</blockquote>;
}

// 导出完整的组件映射
export const mdxComponents = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  p: Paragraph,
  ul: UnorderedList,
  ol: OrderedList,
  li: ListItem,
  blockquote: BlockQuote,
  code: Code,
  img: CenterImage,
  a: CustomLink,
  table: Table,
  Callout,
  ProsCard,
  ConsCard,
};
