// lib/mdx.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { bundleMDX } from "mdx-bundler";

const postsDir = path.join(process.cwd(), "posts");

export function getPostSlugs() {
  return fs.readdirSync(postsDir).map((f) => f.replace(/\.mdx$/, ""));
}

export async function getPostBySlug(slug: string) {
  const fullPath = path.join(postsDir, slug + ".mdx");
  const source = fs.readFileSync(fullPath, "utf8");

  // 解析 front-matter
  const { data, content } = matter(source);

  // bundleMDX 会返回一个 React 组件和前端需要的数据
  const mdxSource = await bundleMDX({
    source: content,
    mdxOptions(options) {
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        require("remark-slug"),
        require("remark-autolink-headings"),
      ];
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        require("rehype-prism-plus"),
      ];
      return options;
    },
  });

  return { frontMatter: data, mdxSource };
}
