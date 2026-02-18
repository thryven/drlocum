import fs from "fs";
import path from "path";
import BlogModal from "./BlogModal";

export default function BlogPage() {
  // Server-side: read all HTML files in /public/blog
  const blogDir = path.join(process.cwd(), "public", "blog");
  const htmlFiles = fs.readdirSync(blogDir).filter((file) => file.endsWith(".html"));

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Blog Posts</h1>
      {htmlFiles.length === 0 ? (
        <p>No blog posts found.</p>
      ) : (
        <BlogModal files={htmlFiles} />
      )}
    </div>
  );
}
