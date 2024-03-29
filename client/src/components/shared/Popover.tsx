import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  IconButton,
  Popover as RadixPopover,
  TextField,
} from "@radix-ui/themes";
import { PlusIcon } from "@radix-ui/react-icons";

type Props = {
  handleAddOption: (option: string) => void;
};

const Popover = ({ handleAddOption }: Props) => {
  const [option, setOption] = useState("");

  return (
    <RadixPopover.Root>
      <RadixPopover.Trigger>
        <IconButton radius="full">
          <PlusIcon />
        </IconButton>
      </RadixPopover.Trigger>
      <RadixPopover.Content width="360px">
        <Flex gap="3">
          <Box flexGrow="1">
            <TextField.Root
              size="2"
              placeholder="Option"
              onChange={(e: any) => setOption(e.target.value)}
            />
            <Flex gap="3" mt="3" justify="between">
              <Flex align="center" gap="2" asChild></Flex>
              <RadixPopover.Close>
                <Button size="1" onClick={() => handleAddOption(option)}>
                  Add
                </Button>
              </RadixPopover.Close>
            </Flex>
          </Box>
        </Flex>
      </RadixPopover.Content>
    </RadixPopover.Root>
  );
};

export default Popover;
