import { Header } from "@/components/header";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/trpc/server";
import Link from "next/link";
import React, { Suspense } from "react";

export default function Page() {
  return (
    <div>
      <Header heading="Today" text="What You've eaten today.">
        <Link href={"/new"}>
          <Button>
            <span className="sr-only">Add Meal</span>
            <Icons.add className="mr-2 h-4 w-4" />
            Add Meal
          </Button>
        </Link>
      </Header>
      <Suspense
        fallback={
          <div className="flex flex-col gap-4 p-3">
            {Array.from({ length: 10 }).map((_, i) => {
              return <Skeleton className="h-32 w-full" key={i}></Skeleton>;
            })}
          </div>
        }
      >
        <Items />
      </Suspense>
    </div>
  );
}

const Items = async () => {
  const entries = await api.entry.all.query();
  return (
    <div className="flex flex-col gap-4 p-3">
      {entries.map((entry) => {
        return (
          <Card key={entry.id}>
            <CardHeader>
              <CardTitle>{entry.name}</CardTitle>
            </CardHeader>
            <CardFooter>
              <Link href={`/details/${entry.id}`}>
                <Button>
                  <span className="sr-only">Show Details</span>
                  <Icons.billing className="mr-2 h-4 w-4" />
                  Show details
                </Button>
              </Link>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};
