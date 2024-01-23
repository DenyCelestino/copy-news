import { Coins } from "lucide-react";

interface PostHeaderProps {
  id: string;
  owner_id: string;
  parent_id: string | null;
  slug: string;
  title: string;
  body: string;
  status: string;
  source_url: string | null;
  created_at: string;
  updated_at: string;
  published_at: string;
  deleted_at: null;
  owner_username: string;
  tabcoins: number;
  children_deep_count: number;
}
interface PostProps {
  post: PostHeaderProps;
}

const PostBody = ({ post }: PostProps) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <span className="text-muted-foreground">By {post.owner_username}</span>
      <span className="text-muted-foreground">
        Published at: {new Date(post.published_at).toLocaleString()}
      </span>
      <span className="text-muted-foreground flex items-center gap-1">
        Tabcoins: {post.tabcoins} <Coins color="gold" size={15} />
      </span>
      <h1 className="text-2xl font-bold">{post.title}</h1>
      <p className="text-justify">{post.body}</p>
    </div>
  );
};

export default PostBody;
