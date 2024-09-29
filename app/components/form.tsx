"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/app/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Input } from "@/app/components/ui/input";
import { useModal } from "@/app/hooks/use-modal";
import { useBookmark } from "@/app/hooks/use-bookmark";
import { categories } from "@/app/util/categories";
import { types } from "@/app/util/types";

const formSchema = z.object({
  url: z
    .string()
    .url("Please enter a valid URL")
    .min(5, { message: "The URL must be at least 5 characters long" }),
  title: z
    .string()
    .min(2, { message: "The title must be at least 2 characters long" })
    .max(100, { message: "The title cannot exceed 100 characters" }),
  type: z
    .string()
    .min(2, { message: "The title must be at least 2 characters long" })
    .max(100, { message: "The title cannot exceed 100 characters" }),
  category: z
    .string()
    .min(3, { message: "The category must be at least 3 characters long" })
    .max(50, { message: "The category cannot exceed 50 characters" }),
});

interface BookmarkFormProps {
  bookmarkId?: string;
  defaultValues?: {
    url: string;
    title: string;
    type: string;
    category: string;
  };
}

export default function BookMarkForm({
  bookmarkId,
  defaultValues = { url: "", title: "", type: "", category: "" }, // Provide default values for new bookmarks
}: BookmarkFormProps) {
  const { closeModal } = useModal();
  const { addBookmark, updateBookmark, fetchBookmarks } = useBookmark();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { url, title, type, category } = values;

    if (bookmarkId) {
      await updateBookmark(Number(bookmarkId), {
        url,
        title,
        type,
        category,
      });
    } else {
      await addBookmark({
        url,
        title,
        category,
        type,
        status: "inbox",
        is_favourite: false,
      });
    }

    await fetchBookmarks();
    closeModal();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input placeholder="https://google.com" {...field} />
              </FormControl>
              <FormDescription>
                Enter the URL of the bookmark you want to add.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Google" {...field} />
              </FormControl>
              <FormDescription>
                Enter the title of the bookmark you want to add.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Select a category for the bookmark you want to add.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Select a category for the bookmark you want to add.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {types.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Select a type for the bookmark you want to add.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="mt-4" type="submit">
          {bookmarkId ? "Update" : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
