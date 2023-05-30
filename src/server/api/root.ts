import { createTRPCRouter } from "./trpc";
import { exampleRouter } from "./routers/example";
import createStripeRouter from "./routers/account";
import newUserRouter from "./routers/account";
import { userRouter } from "./routers/user";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  user: userRouter,
  stripe: createStripeRouter,
  create: newUserRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
