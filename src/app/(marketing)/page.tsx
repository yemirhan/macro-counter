import { Header } from "@/components/header";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import React from "react";

const Page = (props) => {
  const day = new Date();
  return (
    <div>
      <Header heading="Today" text="What You've eaten today.">
        <Button>
          <span className="sr-only">Add Meal</span>
          <Icons.add className="mr-2 h-4 w-4" />
          Add Meal
        </Button>
      </Header>
    </div>
  );
};

export default Page;
