import { Box, Container, Grid, Heading } from "@radix-ui/themes";
import React, { useEffect } from "react";
import VoteCard from "../components/voteList/VoteCard";
import useAuthContext from "../contexts/AuthContext";
import agent from "../api/agent";
import VoteList from "../components/voteList/VoteList";

const DUMMY_ITEMS = [
  {
    text: "The quick brown fox jumps over the lazy dog.",
    // color: "bg-pink-400",
    color: "bg-gray-800",
    link: "whatever",
    state: "completed",
  },
  {
    text: "The quick brown fox jumps over the lazy dog.",
    // color: "bg-red-300",
    color: "bg-gray-800",
    link: "whatever",
    state: "inprogress",
  },
  {
    text: "The quick brown fox jumps over the lazy dog.",
    // color: "bg-sky-300",
    // color: "bg-sky-500",
    color: "bg-gray-800",
    link: "whatever",
    state: "completed",
  },
];

const MainPage = () => {
  return (
    <div>
      <Heading>My votes</Heading>
      <VoteList />
      <Heading>Votes your were invited to</Heading>
      {/* <Grid columns="5" gap="3" rows="repeat(2, 128px)" width="auto">
        {DUMMY_ITEMS.map((item, index: number) => (
          <VoteCard data={{ ...item, index }} />
        ))}
      </Grid> */}
    </div>
  );
};

export default MainPage;
