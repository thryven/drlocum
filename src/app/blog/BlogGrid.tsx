"use client";

import { useState, useEffect } from "react";

interface BlogPost {
  file: string;
  title: string;
}

interface BlogGridProps {
  posts: BlogPost[];
}

export default function BlogGrid({ posts }: BlogGridProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // trigger fade-in after mount
  }, []);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: "2rem",
      }}
    >
      {posts.map((post, index) => {
        return (
          <div
            key={post.file}
            style={{
              padding: "1.5rem",
              borderRadius: "12px",
              background: "#fff",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              opacity: mounted ? 1 : 0,
              transform: mounted
                ? "translateY(0)"
                : "translateY(20px)", // slide-up effect
              transition: `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${
                index * 0.1
              }s`,
            }}
            onClick={() =>
              window.dispatchEvent(
                new CustomEvent("openBlogModal", { detail: post.file })
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
              {post.title}
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
