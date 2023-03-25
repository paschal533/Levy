import { ParticipantPopulated } from "../../../backend/src/util/types";

export const formatUsernames = (
  participants: Array<ParticipantPopulated>,
  myUserId: string
): string => {
  const usernames = participants
    .filter((participant) => participant.user.id != myUserId)
    .map((participant) => participant.user.username);

  return usernames.join(", ");
};

export const formatUserImage = (
  participants: Array<ParticipantPopulated>,
  myUserId: string
): string => {
  const userImages = participants
    .filter((participant) => participant.user.id != myUserId)
    .map((participant) => participant.user.image);

  return userImages.join(",");
};
