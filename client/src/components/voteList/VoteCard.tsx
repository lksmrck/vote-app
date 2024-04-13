import React from "react";
import { Avatar, Badge, Box, Text } from "@radix-ui/themes";
import useAuthContext from "../../contexts/AuthContext";

type Props = {
  data: {
    text: string;
    color: string;
    link: string;
    index: number;
    state: string;
    name?: string;
    id?: string;
    options?: any[];
  };
};

const VoteCard = ({ data }: Props) => {
  const { text, color, link, index, state, id } = data;
  const { currentUser } = useAuthContext();

  const getTotalVotesCount = () => {
    let count = 0;
    data.options?.forEach((o: any) => (count += o.count));
    return count;
  };

  return (
    <>
      <div className="flex gap-10 ">
        <a href={`/vote/${id}`} key={index} target="_blank">
          <div
            className={`w-96 sm:w-96 h-52 mx-auto ${color ?? "bg-cyan-800"} text-center text-xl font-bold py-3 border-2 border-black shadow-custom hover:shadow-none transition-all hover:translate-x-1 hover:translate-y-1 rounded-xl`}
          >
            <Box>
              <Avatar
                src={currentUser?.photoUrl}
                fallback={currentUser?.displayName[0] ?? "?"}
              />
              <Text>{currentUser?.displayName}</Text>
            </Box>
            <Text>{data.name}</Text>
            <Box>
              {state === "completed" ? (
                <Badge color="green">Finished</Badge>
              ) : (
                <Badge color="tomato">Ongoing</Badge>
              )}
            </Box>
            <Box>{getTotalVotesCount()}</Box>
          </div>
        </a>
      </div>
    </>
  );
};

export default VoteCard;
