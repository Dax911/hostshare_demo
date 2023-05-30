import { clerkClient } from "@clerk/nextjs/server";
import { stripeApiClient } from "use-stripe-subscription";
import { PrismaClient } from '@prisma/client';
import { createTRPCRouter, protectedProcedure } from '../trpc';

const prisma = new PrismaClient();

const newUserRouter = createTRPCRouter({
  addNewUsertoDb: protectedProcedure.query(async ({ ctx }) => {
    const getUser = await prisma.user.findUnique({
      where: {
        clerkId: ctx.auth.userId,
      },
    });

    if (!getUser) {
      await prisma.user.upsert({
        where: {
          clerkId: ctx.auth.userId,
        },
        create: {
          clerkId: ctx.auth.userId,
        },
        update: {
          clerkId: ctx.auth.userId,
        },
      });

      return {
        message: 'User added to the database successfully.',
      };
    }

    const user = await clerkClient.users.getUser(ctx.auth.userId);
    
    await prisma.user.update({
      where: {
        clerkId: user.id,
      },
      data: {
        email: user.emailAddresses[0]?.emailAddress,
        lastName: `${user.lastName}`,
        userName: `${user.username}`,
      },

    });

    const getCurrentUpdatedUser = await clerkClient.users.getUser(user.id);

    const StripeId = getCurrentUpdatedUser.publicMetadata.stripeCustomerId;

    await prisma.user.update({
      where: {
        clerkId: user.id,
      },
      data: {
        stripeId: `${StripeId}`,
      },
    });

    
    if (!StripeId) {
    // Create a new Stripe customer for the user
    const customer = await stripeApiClient.customers.create({
      name: `${user.firstName} ${user.lastName}`,
      email: user.emailAddresses[0]?.emailAddress,
      metadata: {
        clerkUserId: user.id,
      },
    });


    // Update the user's metadata in Clerk with the Stripe customer ID
    await clerkClient.users.updateUser(user.id, {
      publicMetadata: {
        stripeCustomerId: customer.id,
      },
    });

    await prisma.user.update({
      where: {
        clerkId: user.id,
      },
      data: {
        stripeId: `${StripeId}`,
      },
    });

  }


    //const stripeIds = stripeCustomerSearch.data[0].id;
/*
    await prisma.user.update({
      where: {
        clerkId: user.id,
      },
      data: {
        stripeId: stripeIds.id,
      },
    });

*/
    return {
      message: 'User added to the database and Stripe customer created successfully.',
    };
  }),
});

export default newUserRouter;