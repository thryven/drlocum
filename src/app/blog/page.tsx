import fs from "fs";
import path from "path";
import BlogPreview from "./BlogPreview";

export default function BlogListPage() {
  const blogDir = path.join(process.cwd(), "public", "blog");

  // Read all HTML files in /public/blog
  const htmlFiles = fs.readdirSync(blogDir).filter((file) => file.endsWith(".html"));

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Blog List with Live Preview</h1>

      {htmlFiles.length === 0 ? (
        <p>No HTML files found in /public/blog.</p>
      ) : (
        <BlogPreview files={htmlFiles} />
      )}
    </div>
  );
}
