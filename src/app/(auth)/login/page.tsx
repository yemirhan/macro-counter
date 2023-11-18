import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { siteConfig } from "@/config/site";
import { Icons } from "@/components/icons";
import { LoginUsingDiscord } from "../_components/LoginUsingDiscord";
export default function CardWithForm() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Log In</CardTitle>
        <CardDescription>Welcome to {siteConfig.name}!</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" type="email" placeholder="Your E-Mail" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col justify-between gap-2">
        <Button className="w-full">
          <span className="sr-only">Log in</span>
          <Icons.mail className="mr-2 h-4 w-4" />
          Log in using magic link
        </Button>
        <LoginUsingDiscord />
      </CardFooter>
    </Card>
  );
}
