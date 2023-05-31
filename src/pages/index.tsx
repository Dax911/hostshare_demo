import Link from "next/link";

import { buttonVariants } from "../components/ui/button";

import { AlertTriangle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";


import SearchBarComp from "../components/searchbox";

function AlertDemo() {
  return (
    <div className="max-w-[700px] items-center pb-4">

    <Alert variant={"destructive"}>
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>While this is a demo it does use an AI recommendation engine. This both supplies the demo with customizable recommendations and keeps me from being eaten alive by API costs. So please login or signup.</AlertDescription>
    </Alert>
    </div>

  );
}

export default function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">

      <div className="flex flex-col items-center gap-2">
      <AlertDemo />

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
            href="/search"
            className={buttonVariants({ variant: "outline", size: "lg" })}
          >
            Search
          </Link>
          </div>
          <SearchBarComp />

        </div>

    </section>
  );
}
