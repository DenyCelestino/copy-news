import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NewsPosts from "@/components/news-posts";
import { Suspense } from "react";
import RelevantPost from "../relevant-post";
import OldPosts from "../old-posts";

export const Filter = async () => {
  const news = await fetch(
    `${process.env.NEXT_PUBLIC_URL_BASE_URL}contents?page=1&per_page=100&strategy=new`,
    {
      cache: "no-store",
    }
  ).then((res) => res.json());

  console.log(news);

  const relevant = await fetch(
    `${process.env.NEXT_PUBLIC_URL_BASE_URL}contents?page=1&per_page=100&strategy=relevant`,
    {
      cache: "no-store",
    }
  ).then((res) => res.json());
  const old = await fetch(
    `${process.env.NEXT_PUBLIC_URL_BASE_URL}contents?page=1&per_page=100&strategy=old`,
    {
      cache: "no-store",
    }
  ).then((res) => res.json());

  return (
    <Tabs defaultValue="news" className="w-full ">
      <span className="text-xs text-muted-foreground">
        Copyright © 2024 Delfim Celestino. All rights reserved.
      </span>
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="news">News</TabsTrigger>
        <TabsTrigger value="relevant">Relevant</TabsTrigger>
        <TabsTrigger value="old">Old</TabsTrigger>
      </TabsList>
      <TabsContent className="w-full" value="news">
        <Suspense fallback={<div>Loading...</div>}>
          <NewsPosts status={news.status_code} data={news} />
        </Suspense>
      </TabsContent>
      <TabsContent value="relevant">
        <RelevantPost status={relevant.status_code} data={relevant} />
      </TabsContent>
      <TabsContent value="old">
        <OldPosts status={old.status_code} data={old} />
      </TabsContent>
    </Tabs>
  );
};

export default Filter;
