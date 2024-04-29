"use client";

import { Link2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import SearchAutocomplete from "./search-autocomplete";

export default function SearchBar() {
  const searchParams = useSearchParams();
  const q = searchParams?.get("q");

  function search(query: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (query) {
      params.set("q", query);
    } else {
      params.delete("q");
    }
    window.history.replaceState(null, "", `?${params.toString()}`);
  }

  return (
    <div className="flex w-full max-w-md flex-col">
      <div className="peer relative flex w-full items-center">
        <Link2 className="absolute inset-y-0 left-0 my-2 ml-3 w-5 text-gray-400" />
        <input
          name="query"
          id="query"
          className="block w-full rounded-md border-gray-200 pl-10 text-sm text-gray-900 placeholder-gray-400 shadow-lg focus:border-gray-500 focus:outline-none focus:ring-gray-500"
          placeholder="Search for a project"
          defaultValue={q}
          onChange={(e) => {
            search(e.target.value);
          }}
          aria-invalid="true"
        />
      </div>
      <div className="relative hidden hover:block peer-focus-within:block">
        <SearchAutocomplete query={q} />
      </div>
    </div>
  );
}

export function SearchBarPlaceholder() {
  return (
    <div className="relative flex w-full max-w-md items-center">
      <Link2 className="absolute inset-y-0 left-0 my-2 ml-3 w-5 text-gray-400" />
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
