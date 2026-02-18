"use client";

interface BlogGridProps {
  files: string[];
}

export default function BlogGrid({ files }: BlogGridProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: "2rem",
      }}
    >
      {files.map((file) => {
        const slug = file.replace(".html", "");
        return (
          <div
            key={slug}
            style={{
              padding: "1.5rem",
              borderRadius: "12px",
              background: "#fff",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              cursor: "pointer",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
            onClick={() =>
              window.dispatchEvent(
                new CustomEvent("openBlogModal", { detail: file })
              )
            }
            onMouseEnter={(e) => {
              const target = e.currentTarget as HTMLDivElement;
              target.style.transform = "translateY(-5px)";
              target.style.boxShadow = "0 8px 20px rgba(0,0,0,0.1)";
            }}
            onMouseLeave={(e) => {
              const target = e.currentTarget as HTMLDivElement;
              target.style.transform = "translateY(0)";
              target.style.boxShadow = "0 4px 12px rgba(0,0,0,0.05)";
            }}
          >
            <h2
              style={{
                fontSize: "1.25rem",
                fontWeight: "600",
                marginBottom: "1rem",
              }}
            >
              {slug}
            </h2>
            <p style={{ color: "#666", fontSize: "0.95rem" }}>
              Click to preview the blog post in full-screen.
            </p>
          </div>
        );
      })}
    </div>
  );
}
