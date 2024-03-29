import {
  Box,
  Card,
  IconButton,
  Text,
  TextField,
  Tooltip,
} from "@radix-ui/themes";
import React, { useState } from "react";
import Popover from "../components/shared/Popover";
import VoteOption from "../components/shared/VoteOption";

type Vote = {
  name: string;
  options: string[];
};

const CreateVote = () => {
  const [formData, setFormData] = useState<Vote>({
    name: "",
    options: [],
  } as Vote);

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
              options: [...formData.options, option],
            }))
          }
        />
        {formData?.options?.map((o: string, i: number) => (
          <VoteOption index={i} name={o} />
        ))}
      </Card>
    </Box>
  );
};

export default CreateVote;
