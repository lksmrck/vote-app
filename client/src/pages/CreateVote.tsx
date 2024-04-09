import {
  Box,
  Button,
  Card,
  IconButton,
  Text,
  TextField,
  Tooltip,
} from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import Popover from "../components/shared/Popover";
import VoteOption from "../components/shared/VoteOption";
import agent from "../api/agent";
import { VoteBase, VoteOptionBase, Vote } from "../models/vote";
import useAuthContext from "../contexts/AuthContext";

const CreateVote = () => {
  const { currentUser } = useAuthContext();

  useEffect(() => {
    agent.Votes.getVotesForUser(currentUser!.id);
  }, []);

  const [formData, setFormData] = useState<Vote>({
    name: "",
    options: [],
    state: "ACTIVE",
    views: 0,
    creatorId: currentUser?.id.toString(),
  } as Vote);

  const handleCreateVote = async () => {
    await agent.Votes.create(formData);
  };

  return (
    <Box width="50%">
      <Card size="5" className="bg-cyan-950">
        <TextField.Root
          size="2"
          placeholder="What is vote about"
          onChange={(e: any) =>
            setFormData((prev) => ({ ...prev, name: e.target.value }))
          }
        />
        <Text>Vote options</Text>

        <Popover
          handleAddOption={(option) =>
            setFormData((prev) => ({
              ...prev,
              options: [...formData.options, { name: option }],
            }))
          }
        />
        {formData?.options?.map((o: VoteOptionBase, i: number) => (
          <VoteOption index={i} name={o.name} />
        ))}

        <Button onClick={handleCreateVote}>Create</Button>
      </Card>
    </Box>
  );
};

export default CreateVote;
