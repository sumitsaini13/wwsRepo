import BlogItemDetails from "../../../components/BlogItemDetail";

interface BlogPageProps {
  params: { postId: string } | Promise<{ postId: string }>;
}

export default async function BlogPage(props: BlogPageProps) {
  // Await params if it is a Promise
  const params = await props.params;
  const { postId } = params;

  return <BlogItemDetails postId={postId} />;
}
