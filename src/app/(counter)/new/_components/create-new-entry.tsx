"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { type CreateNewEntryType, createNewEntry } from "@/validation/entry";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Icons } from "@/components/icons";
import { api } from "@/trpc/react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { revalidatePath } from "next/cache";

export const CreateNewEntryForm = () => {
  const form = useForm<CreateNewEntryType>({
    resolver: zodResolver(createNewEntry),
    defaultValues: {
      date: new Date(),
      name: "",
      food: {
        name: "",
        fat: 0,
        carbs: 0,
        protein: 0,
        calories: 0,
      },
    },
  });
  const { toast } = useToast();
  const router = useRouter();
  const { mutate, isLoading } = api.entry.create.useMutation({
    onSuccess: () => {
      toast({
        title: "Entry created",
        description: "Your entry has been created.",
      });
      router.refresh();
      router.push("/");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
  const handleSubmit = (values: CreateNewEntryType) => {
    mutate(values);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="grid grid-cols-1 gap-4 p-2 lg:grid-cols-2"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Meal Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Breakfast" />
              </FormControl>
              <FormDescription>The name of your meal.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of birth</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Your date of birth is used to calculate your age.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="food.name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Food Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Chicken" />
              </FormControl>
              <FormDescription>The name of your food.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="food.fat"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fat</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Chicken" />
              </FormControl>
              <FormDescription>The name of your food.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="food.carbs"
          rules={{
            pattern: RegExp(/^[0-9]*$/),
            min: 0,
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Carbs</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Chicken" />
              </FormControl>
              <FormDescription>The name of your food.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="food.protein"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Protein</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Chicken" />
              </FormControl>
              <FormDescription>The name of your food.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="food.calories"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Calories</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Chicken" />
              </FormControl>
              <FormDescription>The name of your food.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="col-span-1 flex flex-row justify-end lg:col-span-2">
          <Button disabled={isLoading} type="submit">
            {isLoading ? (
              <Icons.loading className="mr-2" />
            ) : (
              <Icons.add className="mr-2" />
            )}
            <span className="sr-only">Create</span>
            Create
          </Button>
        </div>
      </form>
    </Form>
  );
};
