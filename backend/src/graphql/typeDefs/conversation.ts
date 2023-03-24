
import gql from "graphql-tag";

const typeDefs = gql`
  scalar Date

  type Mutation {
    createConversation(
        participantIds: [String]
        conversationAddress: String
        userId: String
    ): CreateConversationResponse
  }

  type CreateConversationResponse {
    conversationId: String
  }

  type Conversation {
    id: String
    latestMessage: Message
    conversationAddress: String
    participants: [Participant]
    updatedAt: Date
  }

  type Participant {
    id: String
    user: User
    hasSeenLatestMessage: Boolean
  }

  type Query {
    conversations: [Conversation]
  }

  type Subscription {
    conversationCreated: Conversation
  }

`;

export default typeDefs;