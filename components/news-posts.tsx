"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "lucide-react";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { FadeLoader } from "react-spinners";
import { toast } from "@/components/ui/use-toast";
import Link from "next/link";
interface NewsPostsProps {
  id: string;
  owner_id: string;
  parent_id: string | null;
  slug: string;
  title: string;
  status: string;
  source_url: string;
  created_at: string;
  updated_at: string;
  published_at: string;
  deleted_at: string;
  owner_username: string;
  tabcoins: number;
  children_deep_count: number;
}

interface Props {
  data: NewsPostsProps[];
  status: number;
}

const NewsPosts = ({ data, status }: Props) => {
  const [ref, inView] = useInView();
  const [page, setPage] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [newData, setNewData] = useState<NewsPostsProps[]>(data);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_URL_BASE_URL}/contents?page=${page}&per_page=30&strategy=new`
        );

        if (!res.ok) {
          throw new Error(`Request failed with status: ${res.status}`);
        }

        const posts = await res.json();

        if (posts.data.length > 0) {
          console.log(posts.data);
          setNewData([...newData, ...posts.data]);
          setPage((prev) => prev + 1);
        } else {
          console.log("Não há mais dados para carregar.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast({
          title: "Hey there! 😊",
          description:
            "We are preparing posts for you to come back later to see.",
        });
        // Lidar com o erro conforme necessário
      } finally {
        setLoading(false);
      }
    };

    if (inView) {
      getData();
    }
  }, [inView]);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-4 w-full gap-2">
        {status === 429 && (
          <div className="text-muted-foreground">
            We are preparing posts for you to come back later to see. 😊👌
          </div>
        )}
        {newData.length > 0 && (
          <>
            {newData.map((post) => (
              <Link
                href={`/post/${post.owner_username}/${post.slug}`}
                key={post.id}
              >
                <Card>
                  <div className="h-60">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      className="h-full w-full object-fill"
                      alt={post.title}
                      src={`${process.env.NEXT_PUBLIC_URL_BASE_URL}contents/${post.owner_username}/${post.slug}/thumbnail`}
                    />
                  </div>
                  <CardHeader>
                    <span className="flex items-center  gap-1 text-sm text-muted-foreground">
                      <User size={10} /> {post.owner_username}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {new Date(post.published_at).toDateString()}
                    </span>
                    <CardTitle>
                      {post.title.length > 176
                        ? `${post.title.substring(0, 176)}...`
                        : post.title}
                    </CardTitle>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </>
        )}
      </div>
      {newData.length > 0 && !isLoading && <div ref={ref} />}
      <div className="flex items-center justify-center">
        <FadeLoader loading={isLoading} color={"cyan"} />
      </div>
    </div>
  );
};

export default NewsPosts;
