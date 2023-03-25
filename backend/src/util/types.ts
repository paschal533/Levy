import { Prisma, PrismaClient } from "@prisma/client";
import { PubSub } from "graphql-subscriptions";
//import { ISODateString } from "next-auth";
import {
  conversationPopulated,
  participantPopulated,
} from "../graphql/resolvers/conversation";

import { messagePopulated } from "../graphql/resolvers/message";
import { Context } from "graphql-ws/lib/server";

/**
 * Server Configuration
 */
export interface GraphQLContext {
  //session: Session | null;
  prisma: PrismaClient;
  userId: string | null;
  pubsub: PubSub;
}

export interface Session {
  user?: User;
  //expires: ISODateString;
}

export interface SubscriptionContext extends Context {
  connectionParams: {
    userId?: string;
  };
}

/**
 * Users
 */
export interface User {
  id: string;
  username: string;
  email: string;
  image: string;
  name: string;
  wallectAddress: string;
  privateKey: string;
}

export interface CreateUserResponse {
  success?: boolean;
  error?: string;
}

/**
 * Conversations
 */

export type ConversationPopulated = Prisma.ConversationGetPayload<{
  include: typeof conversationPopulated;
}>;

export type ParticipantPopulated = Prisma.ConversationParticipantGetPayload<{
  include: typeof participantPopulated;
}>;

/*export interface ConversationUpdatedSubscriptionPayload {
  conversationUpdated: {
    conversation: ConversationPopulated;
  };
}

export interface ConversationDeletedSubscriptionPayload {
  conversationDeleted: ConversationPopulated;
}*/

/**
 * Messages
 */
export interface SendMessageArguments {
  id: string;
  conversationId: string;
  senderId: string;
  body: string;
}

export interface MessageSentSubscriptionPayload {
  messageSent: MessagePopulated;
}

export type MessagePopulated = Prisma.MessageGetPayload<{
  include: typeof messagePopulated;
}>;
