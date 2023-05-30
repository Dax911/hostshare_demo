import { prisma } from "../../db";
import { User } from "@prisma/client";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter( {
  getCurrentUser: protectedProcedure.query( async ( { ctx }: any ) => {
    if (!ctx.auth.userId) {
      throw new Error('Not authenticated');
    }

    // Fetch user from database
    const user = await prisma.user.findUnique({
      where: { id: ctx.auth.userId },
    });

    if (!user) {
      return {
        hasCompletedSignup: false,
      };
    }

    return {
      ...user,
      hasCompletedSignup: user.hasCompletedSignup,
    };
  } ),

  createNewUser: protectedProcedure.mutation( ( { ctx, input }: any | User ) => {
    return ctx.prisma.user.create( {
      data: {
        userId: ctx.auth.userId,
        email: input.email,
        name: input.name,
        image: input.image,
      },
    } );
  } ),

} );
