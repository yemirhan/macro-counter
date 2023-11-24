import { Header } from "@/components/header";
import React from "react";
import { CreateNewEntryForm } from "./_components/create-new-entry";

const Page = () => {
  return (
    <div className="flex flex-col">
      <Header
        heading="Add a new Entry"
        text="What You've eaten today."
      ></Header>
      <CreateNewEntryForm />
    </div>
  );
};

export default Page;
