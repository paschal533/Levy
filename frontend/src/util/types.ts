//import { Message } from "graphql-ws";
import {
  ConversationPopulated,
  //MessagePopulated,
} from "../../../backend/src/util/types";

/**
 * Users
 */
export interface CreateUserData {
  createUsername: {
    success: boolean;
    error: string;
  };
}

export interface CreateUserVariables {
  id: string;
  name: string;
  username: string;
  email: String;
  image: String;
  walletAddress: String;
  privateKey: String;
}

export interface SearchUsersInput {
  username: string;
  caller: string;
}

export interface SearchUsersData {
  searchUsers: Array<SearchedUser>;
}

export interface SearchUserInput {
  walletAddress: string;
}

export interface SearchUserData {
  searchUser: SearchedUser;
}

export interface SearchedUser {
  id: string;
  username: string;
  image: string;
  walletAddress: string;
}

/**
 * Conversations
 */

export interface ConversationsData {
  conversations: Array<ConversationPopulated>;
}

export interface CreateConversationData {
  createConversation: {
    conversationId: string;
  };
}

export interface CreateConversationInput {
  participantIds: Array<string>;
  conversationAddress: string;
  userId: string;
}

/*export interface ConversationUpdatedData {
  conversationUpdated: {
    conversation: ConversationPopulated;
  };
}*/

export interface ConversationDeletedData {
  conversationDeleted: {
    id: string;
  };
}

/**
 * Messages
 */
/*export interface MessagesData {
  messages: Array<MessagePopulated>;
}

export interface MessagesVariables {
  conversationId: string;
}

export interface MessageSubscriptionData {
  subscriptionData: {
    data: {
      messageSent: MessagePopulated;
    };
  };
}*/
