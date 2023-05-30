import Link from "next/link"

import { buttonVariants } from "../components/ui/button"

import { AlertTriangle } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert"
import { DemoGithub } from "../components/cards"

import {
  InstantSearch,
  Hits,
  Highlight,
  Snippet,
} from 'react-instantsearch-hooks-web';

function AlertDemo() {
  return (
    <Alert variant={"destructive"}>
      <AlertTriangle className="w-4 h-4" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        This is a Demo.
      </AlertDescription>
    </Alert>
  )
}


export default function IndexPage() {


  return (
    <section className="container grid items-center gap-6 pt-6 pb-8 md:py-10">
      <div className="flex flex-col items-center gap-2 my-20">

        <h1 className="text-3xl font-bold leading-tight tracking-tighter font-Recoleta sm:text-3xl md:text-5xl lg:text-6xl">
        Hosts travel for free. <br className="hidden sm:inline" />
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground sm:text-xl mb-4">
        Share your unbooked nights with other hosts, and experience a new way to travel - free.
        </p>
        <div className="flex items-center gap-4">
        <Link
          href="/user"
          rel="noreferrer"
          className={buttonVariants( { size: "lg" } )}
        >
          Sign In
        </Link>
        <Link
          target="_blank"
          rel="noreferrer"
          href="/browse"
          className={buttonVariants( { variant: "outline", size: "lg" } )}
        >
          Browse
        </Link>
        <DemoGithub />
        <InstantSearch indexName="instant_search" searchClient={searchClient}>
      <SearchBox
        classNames={{
          root: 'p-3 shadow-sm',
          form: 'relative',
          input: 'block w-full pl-9 pr-3 py-2 bg-white border border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 rounded-md focus:ring-1',
          submitIcon: 'absolute top-0 left-0 bottom-0 w-6',
        }}
      />
      {/* ... */}
    </InstantSearch>
      </div>


      </div>
    </section>
  )
}
