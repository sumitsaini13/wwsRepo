// src/api/blog.ts
import qs from "qs";
import { api, q } from "./strapi";

/** POSTS **/
export async function fetchPosts() {
  const query = q({
    populate: { coverImage: { fields: ["url"] } },
    sort: ["publishedAt:desc"],
    pagination: { pageSize: 20 },
  });
  const { data } = await api.get(`/posts?${query}`);
  return data.data; // Strapi returns { data, meta }
}

export async function fetchPostBySlug(postId: string) {
  const query = qs.stringify({
    filters: { postId: { $eq: postId } }, // ✅ use postId
    populate: {
      coverImage: { fields: ["url"] },
      admin_user: { fields: ["username"] }, // ✅ relation field (author)
      comments: true,
      likes: true,
    },
  });

  console.log("Fetching:", `/posts?${query}`);

  const { data } = await api.get(`/posts?${query}`);
  return data.data[0];
}

export async function createPost(input: {
  title: string; slug?: string; excerpt?: string; content: string; coverImageId?: number;
}) {
  const payload: any = { ...input };
  if (input.coverImageId) payload.coverImage = input.coverImageId;
  const { data } = await api.post(`/posts`, { data: payload });
  return data.data;
}

/** UPLOAD **/
export async function uploadFile(file: File) {
  const form = new FormData();
  form.append("files", file);
  const { data } = await api.post(`${api.defaults.baseURL?.replace("/api","")}/upload`, form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data[0]; // { id, url, ... }
}

/** COMMENTS **/
export async function fetchComments(postId: number) {
  const query = q({
    filters: { post: { id: { $eq: postId } } },
    populate: { author: { fields: ["username"] } },
    sort: ["createdAt:desc"],
    pagination: { withCount: true, pageSize: 50 },
  });
  const { data } = await api.get(`/comments?${query}`);
  return data;
}

export async function addComment(postId: number, content: string, authorId: number) {
  const { data } = await api.post(`/comments`, {
    data: { content, post: postId, author: authorId },
  });
  return data.data;
}

/** LIKES **/
export async function getMyLike(postId: number, userId: number) {
  const query = q({
    filters: { post: { id: { $eq: postId } }, user: { id: { $eq: userId } } },
    pagination: { pageSize: 1 },
  });
  const { data } = await api.get(`/likes?${query}`);
  return data.data[0];
}

export async function countLikes(postId: number) {
  const query = q({
    filters: { post: { id: { $eq: postId } } },
    pagination: { withCount: true, pageSize: 1 },
  });
  const { data } = await api.get(`/likes?${query}`);
  return data.meta.pagination.total as number;
}

export async function likePost(postId: number, userId: number) {
  const { data } = await api.post(`/likes`, { data: { post: postId, user: userId }});
  return data.data;
}

export async function unlike(likeId: number) {
  await api.delete(`/likes/${likeId}`);
}
