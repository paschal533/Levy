import { useMutation } from "@apollo/client";
import { Box, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import { ObjectID } from "bson";
import toast from "react-hot-toast";
import { SendMessageArguments } from "../../../../../../backend/src/util/types";
import MessageOperations from "../../../../graphql/operations/message";
import { MessagesData } from "../../../../util/types";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

interface MessageInputProps {
  conversationId: string;
}

const MessageInput: React.FC<MessageInputProps> = ({ conversationId }) => {
  const [messageBody, setMessageBody] = useState("");
  const [sendMessage] = useMutation<
    { sendMessage: boolean },
    SendMessageArguments
  >(MessageOperations.Mutation.sendMessage);
  const { userId, userInfo } = useContext(AuthContext);
  const senderId = userId;
  const { name: userName, profileImage } = userInfo;

  const onSendMessage = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!senderId || !userName || !profileImage) return;

    try {
      // call sendMessage mutation
      const messageId = new ObjectID().toString();
      const newMessage: SendMessageArguments = {
        id: messageId,
        senderId,
        conversationId,
        body: messageBody,
      };

      // Clear input state
      setMessageBody("");

      const { data, errors } = await sendMessage({
        variables: {
          ...newMessage,
        },
        optimisticResponse: {
          sendMessage: true,
        },
        update: (cache) => {
          const existing = cache.readQuery<MessagesData>({
            query: MessageOperations.Query.messages,
            variables: { conversationId },
          }) as MessagesData;

          cache.writeQuery<MessagesData, { conversationId: string }>({
            query: MessageOperations.Query.messages,
            variables: { conversationId },
            data: {
              ...existing,
              messages: [
                {
                  id: messageId,
                  body: messageBody,
                  senderId: senderId,
                  conversationId,
                  sender: {
                    id: senderId,
                    username: userName,
                    image: profileImage,
                  },
                  createdAt: new Date(Date.now()),
                  updatedAt: new Date(Date.now()),
                },
                ...existing.messages,
              ],
            },
          });
        },
      });

      if (!data?.sendMessage || errors) {
        throw new Error("Failed to send message");
      }
    } catch (error: any) {
      console.log("onSendMessage error", error);
      toast.error(error?.message);
    }
  };

  return (
    <Box px={4} py={6} width="100%">
      <form onSubmit={onSendMessage}>
        <Input
          value={messageBody}
          onChange={(event) => setMessageBody(event.target.value)}
          placeholder="New message"
          size="md"
          resize="none"
          borderColor="white"
          _focus={{
            boxShadow: "none",
            border: "1px solid",
            borderColor: "white",
          }}
        />
      </form>
    </Box>
  );
};

export default MessageInput;
