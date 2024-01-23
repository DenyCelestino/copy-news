import Filter from "@/components/home/filter";
import { ModeToggle } from "@/components/mode-toogle";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between ">
      <div className="container flex flex-col gap-2">
        <div>
          <ModeToggle />
          <h1 className="text-2xl uppercase font-bold">Copy News</h1>
          <span className="text-sm text-muted-foreground">
            Get the latest dev news
          </span>
        </div>
        <Filter />
      </div>
    </main>
  );
}
