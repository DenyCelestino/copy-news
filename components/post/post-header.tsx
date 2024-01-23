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

const PostHeader = ({ post }: PostProps) => {
  const image =
    process.env.NEXT_PUBLIC_URL_BASE_URL +
    "contents/" +
    post.owner_username +
    "/" +
    post.slug +
    "/thumbnail";

  return (
    <div className="h-60 md:h-96 w-full rounded-sm ">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img alt="thumbnail" className="h-full w-full rounded-sm" src={image} />
    </div>
  );
};

export default PostHeader;
