"use client";

import typesense, { ProjectHit } from "@/lib/typesense";
import { BlurImage, LoadingSpinner } from "@dub/ui";
import { cn } from "@dub/utils";
import { Command } from "cmdk";
import { Link2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Highlighter from "react-highlight-words";
import { toast } from "sonner";
import { useDebounce } from "use-debounce";

export default function SearchBar() {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<ProjectHit[]>([]);

  const searchParams = useSearchParams();
  const q = searchParams?.get("q") || "";

  function search(query: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (query) {
      params.set("q", query);
    } else {
      params.delete("q");
    }
    window.history.replaceState(null, "", `?${params.toString()}`);
  }

  const [debouncedQuery] = useDebounce(q, 150);

  useEffect(() => {
    const abortController = new AbortController();

    if (!debouncedQuery) return setItems([]);
    const fetchAutocomplete = async (q: string) => {
      try {
        setLoading(true);
        const results = await typesense({ client: true })
          .collections("projects")
          .documents()
          .search(
            {
              q,
              query_by: ["name", "description"],
              highlight_full_fields: ["name", "description"],
              sort_by: "stars:desc",
              num_typos: 1,
              limit: 8,
              exclude_fields: ["out_of", "search_time_ms"],
              infix: ["always", "off"],
            },
            {
              abortSignal: abortController.signal,
            },
          );
        setItems(results.hits as ProjectHit[]);
      } catch (error) {
        toast.error(error);
      }
      setLoading(false);
    };
    fetchAutocomplete(debouncedQuery);

    return () => {
      abortController.abort();
    };
  }, [debouncedQuery]);

  const router = useRouter();

  return (
    <Command className="peer relative w-full max-w-md" loop>
      <div className="absolute inset-y-0 left-3 mt-3 text-gray-400">
        {loading ? (
          <LoadingSpinner className="h-4" />
        ) : (
          <Link2 className="h-4" />
        )}
      </div>
      <Command.Input
        name="query"
        id="query"
        className="block w-full rounded-md border-gray-200 pl-10 text-sm text-gray-900 placeholder-gray-400 shadow-lg focus:border-gray-500 focus:outline-none focus:ring-gray-500"
        placeholder="Search for a project"
        value={q}
        onValueChange={search}
      />
      <Command.List
        className={cn(
          "absolute z-10 mt-2 h-[calc(var(--cmdk-list-height)+17px)] max-h-[300px] w-full overflow-auto rounded-md border border-gray-200 bg-white p-2 shadow-md transition-all duration-75",
          {
            hidden: items.length === 0,
          },
        )}
      >
        {items.map((item) => {
          return (
            <Command.Item
              key={item.document.id}
              value={item.document.name}
              onSelect={() => {
                router.push(`/projects/${item.document.slug}`);
              }}
              className="group flex cursor-pointer items-center justify-between rounded-md px-4 py-2 text-sm text-gray-900 hover:bg-gray-100 hover:text-gray-900 active:bg-gray-200 aria-disabled:cursor-not-allowed aria-disabled:opacity-75 aria-disabled:hover:bg-white aria-selected:bg-gray-100 aria-selected:text-gray-900"
            >
              <div className="flex items-center space-x-2">
                <BlurImage
                  src={item.document.logo}
                  alt={item.document.name}
                  className="h-6 w-6 rounded-full"
                  width={16}
                  height={16}
                />
                <div className="flex flex-col space-y-0.5">
                  <Highlighter
                    highlightClassName="underline bg-transparent text-purple-500"
                    searchWords={
                      item.highlights.find((h) => h.field === "name")
                        ?.matched_tokens || []
                    }
                    autoEscape={true}
                    textToHighlight={item.document.name}
                    className="text-sm font-medium text-gray-600 group-aria-selected:text-purple-600 sm:group-hover:text-purple-600"
                  />
                  <Highlighter
                    highlightClassName="underline bg-transparent text-purple-500"
                    searchWords={
                      item.highlights.find((h) => h.field === "description")
                        ?.matched_tokens || []
                    }
                    autoEscape={true}
                    textToHighlight={item.document.description}
                    className="line-clamp-1 text-xs text-gray-400"
                  />
                </div>
              </div>
            </Command.Item>
          );
        })}
      </Command.List>
    </Command>
  );
}

export function SearchBarPlaceholder() {
  return (
    <div className="peer relative w-full max-w-md">
      <div className="absolute inset-y-0 left-3 mt-3 text-gray-400">
        <Link2 className="h-4" />
      </div>
      <input
        name="query"
        id="query"
        className="block w-full rounded-md border-gray-200 pl-10 text-sm text-gray-900 placeholder-gray-400 shadow-lg focus:border-gray-500 focus:outline-none focus:ring-gray-500"
        placeholder="Search for a project"
        disabled
        aria-invalid="true"
      />
    </div>
  );
}
