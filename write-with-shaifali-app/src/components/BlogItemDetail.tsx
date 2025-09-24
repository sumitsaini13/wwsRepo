"use client"
import { useEffect, useMemo, useState } from "react";

import { addComment, countLikes, fetchComments, fetchPostBySlug, getMyLike, likePost, unlike } from "../lib/api";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter, FaWhatsapp } from "react-icons/fa";

interface BlogItemDetailsProps {
  postId: string;
}

function useCurrentUser() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch (e) {
        console.error("Invalid user JSON in localStorage");
      }
    }
  }, []);

  return user;
}

export default function BlogDetail({ postId }: BlogItemDetailsProps) {
  const me = useCurrentUser();
  const [post, setPost] = useState<any>();
  const [comments, setComments] = useState<any>({ data: [] });
  const [likeCount, setLikeCount] = useState<number>(0);
  const [myLike, setMyLike] = useState<any>();

  useEffect(() => {
    (async () => {
      const p = await fetchPostBySlug(postId!);
      console.log("fetched Post:", p);
      setPost(p);
      if (p) {
        const id = p.id;
        setComments(await fetchComments(id));
        setLikeCount(await countLikes(id));
        if (me) setMyLike(await getMyLike(id, me.id));
      }
    })();
  }, [postId]);

  const url = useMemo(() => window.location.href, []);
  if (!post) return <p style={{ padding: 24 }}>Loading…</p>;
  //const a = post.attributes;
  const cover = post.coverImage?.data?.attributes?.url
    ? `${process.env.NEXT_PUBLIC_STRAPI_API}${post.coverImage.data.attributes.url}` : undefined;

  return (
    <div style={{ maxWidth: 860, margin: "32px auto", padding: 16 }}>
      <article>
        {cover && <img src={cover} alt="" style={{ width:"100%", borderRadius:12, marginBottom:16 }}/>}
        <h1>{post.title}</h1>
        <div style={{ color:"#666", marginBottom: 12 }}>
          By {post.author?.data?.attributes?.username ?? "Unknown"}
        </div>

        {/* Content (from Strapi RichText is HTML) */}
        <div dangerouslySetInnerHTML={{ __html: post.content }} />

        {/* Share */}
        <div style={{ display:"flex", gap:12, marginTop: 24 }}>
          <FaInstagram href={url}>Instagram</FaInstagram>
          <FaFacebookF href={url}>Facebook</FaFacebookF>
          <FaLinkedinIn href={url}>LinkedIn</FaLinkedinIn>
          <FaTwitter href={url}>Twitter/X</FaTwitter>
          <FaWhatsapp>WhatsApp</FaWhatsapp>
        </div>

        {/* Likes */}
        <div style={{ marginTop: 16 }}>
          <button onClick={async ()=>{
            if (!me) return alert("Please log in to like");
            if (myLike) {
              await unlike(myLike.id);
              setMyLike(undefined);
              setLikeCount(c => Math.max(0, c-1));
            } else {
              const l = await likePost(post.id, me.id);
              setMyLike(l);
              setLikeCount(c => c+1);
            }
          }}>
            {myLike ? "♥ Unlike" : "♡ Like"} ({likeCount})
          </button>
        </div>

        {/* Comments */}
        <CommentsSection postId={post.id} me={me} comments={comments} setComments={setComments} />
      </article>
    </div>
  );
}

function CommentsSection({ postId, me, comments, setComments }:{
  postId:number, me:any, comments:any, setComments:(v:any)=>void
}) {
  const [text, setText] = useState("");

  return (
    <section style={{ marginTop: 32 }}>
      <h3>Comments</h3>

      {me ? (
        <div style={{ display:"flex", gap:8, marginBottom:16 }}>
          <input
            placeholder="Write a comment…"
            value={text}
            onChange={e=>setText(e.target.value)}
            style={{ flex:1, padding:8 }}
          />
          <button onClick={async ()=>{
            if (!text.trim()) return;
            await addComment(postId, text.trim(), me.id);
            setText("");
            const updated = await fetchComments(postId);
            setComments(updated);
          }}>Post</button>
        </div>
      ) : (
        <p>Login to post a comment.</p>
      )}

      <ul style={{ listStyle:"none", padding:0, display:"grid", gap:12 }}>
        {comments.data.map((c:any) => (
          <li key={c.id} style={{ border:"1px solid #eee", borderRadius:8, padding:12 }}>
            <div style={{ fontSize:14, color:"#666" }}>
              {c.attributes.author?.data?.attributes?.username ?? "User"}
            </div>
            <div>{c.attributes.content}</div>
          </li>
        ))}
      </ul>
    </section>
  );
}
