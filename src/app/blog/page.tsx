import fs from "fs";
import path from "path";
import BlogGrid from "./BlogGrid";
import BlogModal from "./BlogModal";

export default function BlogPage() {
  const blogDir = path.join(process.cwd(), "public", "blog");
  const htmlFiles = fs.readdirSync(blogDir).filter((file) => file.endsWith(".html"));

  return (
    <div
      style={{
        padding: "4rem 2rem",
        fontFamily: "system-ui, sans-serif",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <h1
        style={{
          fontSize: "2.5rem",
          fontWeight: "bold",
          marginBottom: "2rem",
          textAlign: "center",
        }}
      >
        Blog Posts
      </h1>

      {htmlFiles.length === 0 ? (
        <p style={{ textAlign: "center", color: "#555" }}>No blog posts found.</p>
      ) : (
        <BlogGrid files={htmlFiles} />
      )}

      <BlogModal files={htmlFiles} />
    </div>
  );
}
