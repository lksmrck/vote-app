import React from "react";
import { Avatar, Badge, Box, Text } from "@radix-ui/themes";

type Props = {
  data: {
    text: string;
    color: string;
    link: string;
    index: number;
    state: string;
  };
};

const VoteCard = ({ data }: Props) => {
  const { text, color, link, index, state } = data;
  return (
    <>
      <div className="flex gap-10 ">
        <a href={link} key={index} target="_blank">
          <div
            className={`w-96 sm:w-96 h-52 mx-auto ${color} text-center text-xl font-bold py-3 border-2 border-black shadow-custom hover:shadow-none transition-all hover:translate-x-1 hover:translate-y-1 rounded-xl`}
          >
            <Box>
              <Avatar
                src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
                fallback="A"
              />
              <Text>Pavel Novak</Text>
            </Box>
            <Text>{text}</Text>
            <Box>
              {state === "completed" ? (
                <Badge color="green">Finished</Badge>
              ) : (
                <Badge color="tomato">Ongoing</Badge>
              )}
            </Box>
          </div>
        </a>
      </div>
    </>
  );
};

export default VoteCard;
