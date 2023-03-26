import { GraphQLContext,  
  ConversationDeletedSubscriptionPayload,
  ConversationPopulated,
  ConversationUpdatedSubscriptionPayload, } from "../../util/types";
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
        markConversationAsRead: async function (
          _: any,
          args: { userId: string; conversationId: string },
          context: GraphQLContext
        ): Promise<boolean> {
          const { userId : signer, prisma } = context;
          const { userId, conversationId } = args;
    
          if (!signer) {
            throw new GraphQLError("Not authorized");
          }
    
          try {
            const participant = await prisma.conversationParticipant.findFirst({
              where: {
                userId,
                conversationId,
              },
            });
    
            /**
             * Should always exists but being safe
             */
            if (!participant) {
              throw new GraphQLError("Participant entity not found");
            }
    
            await prisma.conversationParticipant.update({
              where: {
                id: participant.id,
              },
              data: {
                hasSeenLatestMessage: true,
              },
            });
    
            return true;
          } catch (error: any) {
            console.log("markConversationAsRead error", error);
            throw new GraphQLError(error?.message);
          }
        },
        deleteConversation: async function (
          _: any,
          args: { conversationId: string },
          context: GraphQLContext
        ): Promise<boolean> {
          const { userId, prisma, pubsub } = context;
          const { conversationId } = args;
    
          if (!userId) {
            throw new GraphQLError("Not authorized");
          }
    
          try {
            /**
             * Delete conversation and all related entities
             */
            const [deletedConversation] = await prisma.$transaction([
              prisma.conversation.delete({
                where: {
                  id: conversationId,
                },
                include: conversationPopulated,
              }),
              prisma.conversationParticipant.deleteMany({
                where: {
                  conversationId,
                },
              }),
              prisma.message.deleteMany({
                where: {
                  conversationId,
                },
              }),
            ]);
    
            pubsub.publish("CONVERSATION_DELETED", {
              conversationDeleted: deletedConversation,
            });
          } catch (error: any) {
            console.log("deleteConversation error", error);
            throw new GraphQLError("Failed to delete conversation");
          }
    
          return true;
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
      conversationUpdated: {
        subscribe: withFilter(
          (_: any, __: any, context: GraphQLContext) => {
            const { pubsub } = context;
  
            return pubsub.asyncIterator(["CONVERSATION_UPDATED"]);
          },
          (
            payload: ConversationUpdatedSubscriptionPayload,
            _: any,
            context: GraphQLContext
          ) => {
            const { userId } = context;
  
            if (!userId) {
              throw new GraphQLError("Not authorized");
            }
  
            const {
              conversationUpdated: {
                conversation: { participants },
              },
            } = payload;
  
            return userIsConversationParticipant(participants, userId);
          }
        ),
      },
      conversationDeleted: {
        subscribe: withFilter(
          (_: any, __: any, context: GraphQLContext) => {
            const { pubsub } = context;
  
            return pubsub.asyncIterator(["CONVERSATION_DELETED"]);
          },
          (
            payload: ConversationDeletedSubscriptionPayload,
            _: any,
            context: GraphQLContext
          ) => {
            const { userId } = context;
  
            if (!userId) {
              throw new GraphQLError("Not authorized");
            }
  
            const {
              conversationDeleted: { participants },
            } = payload;
  
            return userIsConversationParticipant(participants, userId);
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