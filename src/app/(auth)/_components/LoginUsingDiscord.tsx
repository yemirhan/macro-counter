"use client";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { signIn } from "next-auth/react";
import React, { useState } from "react";

export const LoginUsingDiscord = () => {
  const [loggingIn, setLoggingIn] = useState(false);
  const { toast } = useToast();
  const handleLogin = async () => {
    try {
      setLoggingIn(true);
      await signIn("discord", {
        callbackUrl: "/",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong while logging in.",
        variant: "destructive",
      });
      setLoggingIn(false);
    } finally {
      setLoggingIn(false);
    }
  };
  return (
    <Button onClick={handleLogin} disabled={loggingIn} className="w-full">
      {loggingIn ? (
        <Icons.loading className="mr-2 h-4 w-4" />
      ) : (
        <Icons.discord className="mr-2 h-4 w-4" />
      )}
      Log in using Discord
    </Button>
  );
};
