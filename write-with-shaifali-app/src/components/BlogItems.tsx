"use client"
import { useEffect, useState } from "react";
import { fetchPosts } from "../lib/api";
import Link from "next/link";

export default function BlogItems() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts().then(setPosts).finally(()=>setLoading(false));
  }, []);

  if (loading) return <p style={{ padding: 24 }}>Loading…</p>;

return (
  <div style={{ maxWidth: 900, margin: "32px auto", padding: 16 }}>
    <h1 className="text-2xl font-bold mb-6 text-center">
        Discover stories that inspire, ideas that spark creativity, and insights that empower — your daily dose of inspiration, one blog at a time
      </h1>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        gap: 16,
      }}
    >
      {posts.map((post) => {
        const { id, title, slug, excerpt, coverImage } = post;

        // Null-check for coverImage
        const coverUrl = coverImage?.url
          ? `${process.env.NEXT_PUBLIC_STRAPI_API}${coverImage.url}`
          : null;

        return (
          <Link
            key={id}
            href={`/blogs/${slug ?? post.documentId}`} 
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <article
              style={{
                border: "1px solid #eee",
                borderRadius: 12,
                overflow: "hidden",
                padding: 16,
              }}
            >
              {coverUrl && (
                <img
                  src={coverUrl}
                  alt={title}
                  style={{
                    width: "100%",
                    height: 160,
                    objectFit: "cover",
                    borderRadius: 8,
                  }}
                />
              )}
              <h3 style={{ margin: "12px 0 6px" }}>{title}</h3>
              <p style={{ color: "#555" }}>{excerpt}</p>
            </article>
          </Link>
        );
      })}
    </div>
  </div>
);

}
