import { GraphQLContext  } from "../../util/types";
import { CreateUserResponse } from "../../util/types";
import { User } from "@prisma/client";
import { GraphQLError } from "graphql";

const resolvers = {
  Query: {
    searchUsers: async (
      _: any,
      args: any,
      context: GraphQLContext
    ): Promise<Array<User>> => {
      const { username, caller } = args;
      const { prisma } = context;

      if(!caller){
        throw new GraphQLError("Not authorized")
      }

      try {
        const users = await prisma.user.findMany({
          where: {
            username: {
              contains: username,
              not: caller,
              mode: "insensitive",
            },
          },
        });

        return users;
      } catch (error: any) {
        console.log("searchUsers error", error);
        throw new GraphQLError(error?.message);
      }
    },
    searchUser: async  (_: any,
      args: { walletAddress: string },
      context: GraphQLContext
    ): Promise<any> => {
      const { walletAddress } = args;
      const { prisma } = context;

      if(!walletAddress){
        throw new GraphQLError("Not authorized")
      }

      try{
        const user = await prisma.user.findUnique({
          where: {
            walletAddress
          },
        });

        return user;
      }catch(error : any){
        console.log(error)
        throw new GraphQLError(error?.message);
      }
    }
  },
  Mutation: {
    createUser: async (_: any, args: any, context : GraphQLContext): Promise<CreateUserResponse> => {
      const { id, name, username, email, image, walletAddress, privateKey } = args;
      const { prisma } = context;

      try {
        const existingUser = await prisma.user.findUnique({
          where: {
            walletAddress,
          },
        });

        if(existingUser) {
          return {
            error: "user exit",
          };
        }

        await prisma.user.create({
          data: {
            name,
            image,
            email,
            username,
            walletAddress,
            privateKey
          }
        });

      return { success: true };
      }catch(error){
        console.log(error)

        return {
          error: "user not created",
        };
      }
    }
  },
}

export default resolvers;