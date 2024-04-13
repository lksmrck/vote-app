import React, { useEffect, useState } from "react";
import useAuthContext from "../../contexts/AuthContext";
import agent from "../../api/agent";
import VoteCard from "./VoteCard";
import { Box, Grid } from "@radix-ui/themes";

const VoteList = () => {
  const { currentUser } = useAuthContext();
  const [votes, setVotes] = useState([] as any);

  useEffect(() => {
    const fetchData = async () => {
      const data = await agent.Votes.getVotesForUser(currentUser!.id);
      setVotes(data);
    };
    if (currentUser) {
      fetchData();
    }
  }, [currentUser]);
  return (
    <Box>
      <Grid columns="5" gap="3" rows="repeat(2, 256px)" width="auto">
        {votes?.map((item: any, index: number) => (
          <VoteCard data={{ ...item, index }} />
        ))}
      </Grid>
    </Box>
  );
};

export default VoteList;
