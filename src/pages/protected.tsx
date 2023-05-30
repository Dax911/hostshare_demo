import { UserButton } from "@clerk/nextjs";
import { type NextPage } from "next";

const Protected: NextPage = () => {
 
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight dark:text-white sm:text-[5rem]">
          Protected Page
        </h1>
        <div className="text-2xl dark:text-white">
          <p>Protected page.</p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <h2>Plans</h2>
        </div>
      </div>
      <UserButton afterSignOutUrl="/" />
    </main>
  );
};

export default Protected;