import { GraphQLContext, ConversationPopulated } from "../../util/types";
import { GraphQLError } from "graphql";
import { Prisma } from "@prisma/client";
import { withFilter } from "graphql-subscriptions";
import { userIsConversationParticipant } from "../../util/functions";

const resolvers = {
  Query: {
    conversations: async (
      _: any,
      __: any,
      context: GraphQLContext
    ): Promise<Array<ConversationPopulated>> => {
        
      const { userId, prisma } = context;

        if (!userId) {
          throw new GraphQLError("Not authorized");
        }

        try {
          /**
           * Find all conversations that user is part of
           */
          const conversations = await prisma.conversation.findMany({
            /**
             * Below has been confirmed to be the correct
             * query by the Prisma team. Has been confirmed
             * that there is an issue on their end
             * Issue seems specific to Mongo
             */
            // where: {
            //   participants: {
            //     some: {
            //       userId: {
            //         equals: userId,
            //       },
            //     },
            //   },
            // },
            include: conversationPopulated,
          });

          /**
           * Since above query does not work
           */
          return conversations.filter(
            (conversation) =>
              !!conversation.participants.find((p) => p.userId === userId)
          );
        } catch (error: any) {
          console.log("conversations error", error);
          throw new GraphQLError(error?.message);
        }
      },
    },
    Mutation: {
        createConversation: async (
            _: any,
            args: { participantIds: Array<string>, conversationAddress: string, userId: string },
            context: GraphQLContext
          ): Promise<{ conversationId: string }> => {
            const { prisma, pubsub } = context;
            const { participantIds, conversationAddress, userId } = args;
      
            try {
              const conversation = await prisma.conversation.create({
                data: {
                  participants: {
                    createMany: {
                      data: participantIds.map((id) => ({
                        userId: id,
                        hasSeenLatestMessage: id === userId,
                      })),
                    },
                  },
                  conversationAddress,
                },
                include: conversationPopulated,
              });

              
              pubsub.publish("CONVERSATION_CREATED", {
                conversationCreated: conversation,
              });

              return {
                conversationId: conversation.id,
              };
              
            } catch (error) {
              console.log("createConversation error", error);
              throw new GraphQLError("Error creating conversation");
            }
          },
    },

    Subscription: {
      conversationCreated: {
        subscribe: withFilter(
          (_: any, __: any, context: GraphQLContext) => {
            const { pubsub } = context;
  
            return pubsub.asyncIterator(["CONVERSATION_CREATED"]);
          },
          (
            payload: ConversationCreatedSubscriptionPayload,
            _,
            context: GraphQLContext
          ) => {
            const { userId } = context;
  
            if (!userId) {
              throw new GraphQLError("Not authorized");
            }
  
            const {
              conversationCreated: { participants },
            } = payload;
  
            const userIsParticipant = userIsConversationParticipant(
              participants,
              userId
            );
  
            return userIsParticipant;
          }
        ),
      },
    },
}

export interface ConversationCreatedSubscriptionPayload {
  conversationCreated: ConversationPopulated;
}


export const participantPopulated =
  Prisma.validator<Prisma.ConversationParticipantInclude>()({
    user: {
      select: {
        id: true,
        username: true,
        image: true
      },
    },
  });

export const conversationPopulated =
  Prisma.validator<Prisma.ConversationInclude>()({
    participants: {
      include: participantPopulated,
    },
    latestMessage: {
      include: {
        sender: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    },
  });


export default resolvers;