import { type NextPage } from "next";
import { api } from "../../utils/api";
import { use, useEffect, useState } from "react";




const User: NextPage = () => {
//get the user data and display it



const getUser = api.user.getCurrentUser.useQuery();
const [name, setName] = useState();


if (getUser.isLoading) {
  return <div>Loading...</div>;
}

if (getUser.isError) {
  return <div>{getUser.error.message}</div>;
}

useEffect(() => {
  if (getUser.data.hasCompletedSignup === false) {
    setName();
  }
}, [getUser]);





  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight dark:text-white sm:text-[5rem]">
          Pricing
        </h1>
        <div className="text-2xl dark:text-white">
          <p>Choose a plan that works for you.</p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <h2>Plans</h2>
        </div>
      </div>
    </main>
  );
};

export default User;
