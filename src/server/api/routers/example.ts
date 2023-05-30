import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import Stripe from "stripe";

import { subscriptionHandler } from "use-stripe-subscription";
import { env } from "../../../env/server.mjs";

const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
});

export const userzRouter = createTRPCRouter({
  getCurrentUser: protectedProcedure.query(({ ctx }: any) => {
    return ctx.prisma.user.findUnique({
      where: {
        clerkId: ctx.auth.userId,
      },
    });
  }),

  getStripeProducts: protectedProcedure.query(({ctx}: any) => {
    const fetchAllProducts = async () => {
      const products = await stripe.products.list();
      return products;
    };
    return fetchAllProducts();
  }),

  clickedGenerate: protectedProcedure.mutation(({ ctx }: any) => {
    return ctx.prisma.user.update({
      where: {
        clerkId: ctx.auth.userId,
      },
      data: {
        clickedGen: {
          increment: 1,
        },
      },
    });
  }),


  createNewUser: protectedProcedure.query(({ ctx }: any) => {
    if (!ctx.auth.user) {
      throw new Error("No user found");
    }

    return ctx.prisma.user.create({
      data: {
        clerkId: ctx.auth.userId,
        type: "FOUNDER",
      },
    });
  }),

  getStripeCustomer: protectedProcedure.query(({ ctx }: any) => {
    const customerId = ctx.auth.user?.stripeCustomerId;
    return subscriptionHandler({
      customerId,
      query: ctx.req.query,
      body: ctx.req.body,
    });
  }),


});


export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getCurrentUser: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findUnique({
      where: {
        clerkId: ctx.auth.userId,
      },
    });
  }),

});
