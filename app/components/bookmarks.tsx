"use client";

import { useState, useMemo } from "react";
import type { Bookmark } from "@/app/types/bookmarks";
import { ChevronDown } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/app/components/ui/card";
import { Skeleton } from "@/app/components/ui/skeleton";
import { Input } from "@/app/components/ui/input";
import { useBookmark } from "@/app/hooks/use-bookmark";
import BookmarkActions from "@/app/components/actions";
import FavouriteBookmark from "@/app/components/favourite";
import { Badge } from "@/app/components/ui/badge";
import Image from "next/image";
import { categories } from "../util/categories";
import { types } from "../util/types";

import {
  ColumnDef,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";

export const columns: ColumnDef<Bookmark>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      const image = row.original.favicon;

      return (
        <div className="capitalize flex items-center gap-2">
          {image && (
            <Image
              className="rounded-full"
              src={image}
              alt="favicon"
              width={16}
              height={16}
            />
          )}
          <a className="text-blue-700 underline" href={row.original.url}>
            {row.getValue("title")}
          </a>
        </div>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => (
      <Badge className="uppercase" variant="secondary">
        {row.getValue("category")}
      </Badge>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "favourite",
    header: "Favourite",
    cell: ({ row }) => {
      const bookmark = row.original;

      if (bookmark.id === undefined) {
        return;
      }

      return (
        <FavouriteBookmark
          bookmarkId={bookmark.id}
          isFavourite={bookmark.is_favourite}
        />
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status");
      return <Badge className="capitalize">{status as string}</Badge>;
    },
    enableSorting: false,
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.getValue("type");
      return (
        <Badge variant="outline" className="capitalize">
          {type as string}
        </Badge>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"));
      const localDate = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      return <div>{localDate}</div>;
    },
    enableSorting: true,
  },
  {
    id: "actions",
    enableHiding: false,
    header: "Actions",
    cell: ({ row }) => <BookmarkActions bookmark={row.original} />,
  },
];

export default function Bookmarks({
  enableAdvancedFilters = false,
  status = "inbox",
}) {
  const [sorting, setSorting] = useState<SortingState>([
    { id: "date", desc: true },
  ]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [categoryFilter, setCategoryFilter] = useState<string | null>("all");
  const [typeFilter, setTypeFilter] = useState<string | null>("all");
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const { bookmarks, loading } = useBookmark();

  // Filter bookmarks that are within the last week using useMemo
  const filteredBookmarks = useMemo(() => {
    if (!bookmarks) return [];

    // Apply the category filter if one is set (ignores if categoryFilter is null)
    const filterByCategory = (bookmark: Bookmark) => {
      if (!categoryFilter || categoryFilter === "all") return true;
      return bookmark.category === categoryFilter;
    };

    const filterByType = (bookmark: Bookmark) => {
      if (!typeFilter || typeFilter === "all") return true;
      return bookmark.type === typeFilter;
    };

    // If no recent bookmarks, return all bookmarks, but filtered by category if a categoryFilter is set
    return bookmarks.filter(
      (bookmark) =>
        filterByCategory(bookmark) &&
        filterByType(bookmark) &&
        bookmark.status === status
    );
  }, [bookmarks, categoryFilter, typeFilter, status]);

  const table = useReactTable({
    data: filteredBookmarks as unknown as Bookmark[],
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    globalFilterFn: "includesString",
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      globalFilter,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full h-full">
      <Card className="min-h-96">
        <CardHeader className="pb-2">
          <CardTitle>Recent Bookmarks</CardTitle>
        </CardHeader>
        <CardContent>
          {loading && (
            <div className="p-6">
              <div className="flex gap-4 flex-row justify-between mb-4">
                <Skeleton className="h-9 w-96" />
                <Skeleton className="h-9 w-28" />
              </div>
              <div className="flex gap-4 flex-col mb-4">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
              </div>
              <div className="flex flex-row gap-4 justify-between">
                <Skeleton className="h-8 w-1/12" />
                <Skeleton className="h-8 w-2/12" />
              </div>
            </div>
          )}
          {!loading && bookmarks && bookmarks.length > 0 && (
            <>
              <div className="flex items-center justify-between py-4">
                <Input
                  placeholder="Filter by title or category..."
                  value={globalFilter ?? ""}
                  onChange={(event) => setGlobalFilter(event.target.value)}
                  className="max-w-sm"
                />
                <div className="flex gap-4">
                  {enableAdvancedFilters && (
                    <>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" className="ml-auto">
                            Types <ChevronDown className="ml-2 h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="min-w-[10rem]"
                        >
                          <DropdownMenuCheckboxItem
                            key="all"
                            className="capitalize"
                            checked={typeFilter === "all"}
                            onCheckedChange={() => setTypeFilter("all")}
                          >
                            All
                          </DropdownMenuCheckboxItem>
                          {types.map((type) => (
                            <DropdownMenuCheckboxItem
                              key={type.value}
                              className="capitalize"
                              checked={typeFilter === type.value}
                              onCheckedChange={() => setTypeFilter(type.value)}
                            >
                              {type.label}
                            </DropdownMenuCheckboxItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" className="ml-auto">
                            Categories <ChevronDown className="ml-2 h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="min-w-[10rem]"
                        >
                          <DropdownMenuCheckboxItem
                            key="all"
                            className="capitalize"
                            checked={categoryFilter === "all"}
                            onCheckedChange={() => setCategoryFilter("all")}
                          >
                            All
                          </DropdownMenuCheckboxItem>
                          {categories.map((category) => (
                            <DropdownMenuCheckboxItem
                              key={category.value}
                              className="capitalize"
                              checked={categoryFilter === category.value}
                              onCheckedChange={() =>
                                setCategoryFilter(category.value)
                              }
                            >
                              {category.label}
                            </DropdownMenuCheckboxItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </>
                  )}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="ml-auto">
                        Columns <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {table
                        .getAllColumns()
                        .filter((column) => column.getCanHide())
                        .map((column) => {
                          return (
                            <DropdownMenuCheckboxItem
                              key={column.id}
                              className="capitalize"
                              checked={column.getIsVisible()}
                              onCheckedChange={(value) =>
                                column.toggleVisibility(!!value)
                              }
                            >
                              {column.id}
                            </DropdownMenuCheckboxItem>
                          );
                        })}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                      <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                          return (
                            <TableHead key={header.id}>
                              {header.isPlaceholder
                                ? null
                                : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                  )}
                            </TableHead>
                          );
                        })}
                      </TableRow>
                    ))}
                  </TableHeader>
                  <TableBody>
                    {table.getRowModel().rows?.length ? (
                      table.getRowModel().rows.map((row) => (
                        <TableRow
                          key={row.id}
                          data-state={row.getIsSelected() && "selected"}
                        >
                          {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id}>
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={columns.length}
                          className="h-24 text-center"
                        >
                          No results.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              <div className="flex items-center justify-end space-x-2 pt-4">
                <div className="space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </>
          )}
          {!loading && bookmarks && bookmarks.length === 0 && (
            <div className="p-6">
              <p className="text-center text-lg">
                No bookmarks found. Start adding some!
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
