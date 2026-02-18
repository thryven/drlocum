"use client";

import { useState, useEffect, useRef } from "react";

interface BlogModalProps {
  files: string[];
}

export default function BlogModal({ files }: BlogModalProps) {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const startY = useRef<number | null>(null);

  // Open modal: fade-in
  useEffect(() => {
    if (selectedFile) {
      setVisible(true);
    }
  }, [selectedFile]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const closeModal = () => {
    setVisible(false); // start fade-out
    setTimeout(() => setSelectedFile(null), 300); // remove modal after animation
  };

  // Swipe-to-close (mobile)
  const handleTouchStart = (e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!startY.current) return;
    const diff = e.touches[0].clientY - startY.current;
    if (diff > 150) closeModal();
  };

  return (
    <div>
      {/* Blog List */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {files.map((file) => {
          const slug = file.replace(".html", "");
          return (
            <li key={slug} style={{ marginBottom: "1rem" }}>
              <button
                style={{
                  background: "none",
                  border: "none",
                  color: "#0070f3",
                  fontSize: "1.2rem",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
                onClick={() => setSelectedFile(file)}
              >
                {slug}
              </button>
            </li>
          );
        })}
      </ul>

      {/* Full Page Modal */}
      {selectedFile && (
        <div
          ref={modalRef}
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
    </div>
  );
}
