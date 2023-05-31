import Link from "next/link";

import { buttonVariants } from "../components/ui/button";

import { AlertTriangle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";

import {
  InstantSearch,
  Hits,
  Highlight,
  Snippet,
  SearchBox,
} from "react-instantsearch-hooks-web";
import SearchBarComp from "../components/searchbox";

function AlertDemo() {
  return (
    <Alert variant={"destructive"}>
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>This is a Demo.</AlertDescription>
    </Alert>
  );
}

export default function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="my-20 flex flex-col items-center gap-2">
        <h1 className="font-Recoleta text-3xl font-bold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
          Hosts travel for free. <br className="hidden sm:inline" />
        </h1>
        <p className="mb-4 max-w-[700px] text-lg text-muted-foreground sm:text-xl">
          Share your unbooked nights with other hosts, and experience a new way
          to travel - free.
        </p>
        <div className="flex items-center gap-4">
          <Link
            href="/user"
            rel="noreferrer"
            className={buttonVariants({ size: "lg" })}
          >
            Sign In
          </Link>
          <Link
            target="_blank"
            rel="noreferrer"
            href="/browse"
            className={buttonVariants({ variant: "outline", size: "lg" })}
          >
            Browse
          </Link>
          </div>
          <SearchBarComp />

        </div>

    </section>
  );
}
