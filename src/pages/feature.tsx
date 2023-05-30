"use client";
import { NextPage } from "next";
import OnboardingForm from "../comps/onboardingFormTally";
import { buttonVariants } from "../components/ui/button";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

import { useUser } from "@clerk/nextjs";
 



const Apply: NextPage = () => {
//check if user is logged in with clerk
const { isSignedIn } = useUser();


  if ( isSignedIn === false) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight dark:text-white sm:text-[5rem]">
            Welcome to the{" "}
            <span className="text-[hsl(9,100%,70%)]">Survey</span> Page
          </h1>
          <div className="text-2xl dark:text-white">
            <p>You must be logged in to apply.</p>
          </div>
          <Link
            target="_blank"
            rel="noreferrer"
            href="/sign-in"
            className={buttonVariants({ variant: "outline", size: "lg" })}
          >
            Sign In
          </Link>{" "}
        </div>
        <UserButton afterSignOutUrl="/" />

      </main>
    );
  } 

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight dark:text-white sm:text-[5rem]">
          Apply for <span className="text-[hsl(9,100%,70%)]">Xponential</span> AI
        </h1>
        <div className="text-2xl dark:text-white">
          <p>Fill out the form below to apply.</p>
        </div>
        <div className="p-4">
          <OnboardingForm />
        </div>
      </div>
      <UserButton afterSignOutUrl="/" />
    </main>
  );
};

export default Apply;
