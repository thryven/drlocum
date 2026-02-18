"use client";

import { useState, useEffect, useRef } from "react";

interface BlogModalProps {
  files: string[];
}

export default function BlogModal({ files }: BlogModalProps) {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const startY = useRef<number | null>(null);

  // Listen for CustomEvent to open modal from card clicks
  useEffect(() => {
    const handleOpen = (e: CustomEvent) => {
      setSelectedFile(e.detail);
      setVisible(true);
    };
    window.addEventListener("openBlogModal", handleOpen as EventListener);
    return () => window.removeEventListener("openBlogModal", handleOpen as EventListener);
  }, []);

  // Fade-out animation & close logic
  const closeModal = () => {
    setVisible(false);
    setTimeout(() => setSelectedFile(null), 300); // remove after fade-out
  };

  // ESC key closes modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Swipe-to-close on mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!startY.current) return;
    const diff = e.touches[0].clientY - startY.current;
    if (diff > 150) closeModal();
  };

  return (
    <>
      {selectedFile && (
        <div
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "#fff",
            zIndex: 1000,
            opacity: visible ? 1 : 0,
            transition: "opacity 0.3s ease-in-out",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Floating Close Button */}
          <button
            onClick={closeModal}
            style={{
              position: "fixed",
              top: "1rem",
              right: "1rem",
              fontSize: "2rem",
              background: "rgba(0,0,0,0.5)",
              color: "#fff",
              border: "none",
              borderRadius: "50%",
              width: "3rem",
              height: "3rem",
              cursor: "pointer",
              zIndex: 1100,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              transition: "background 0.3s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "rgba(0,0,0,0.7)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "rgba(0,0,0,0.5)")
            }
          >
            ✕
          </button>

          {/* Iframe Content */}
          <iframe
            src={`/blog/${selectedFile}`}
            style={{ width: "100%", height: "100%", border: "none", flex: 1 }}
            title={selectedFile}
          />
        </div>
      )}
    </>
  );
}
