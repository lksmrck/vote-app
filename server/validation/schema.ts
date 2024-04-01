import { z } from "zod";
import { VoteState } from "@prisma/client";

// validace Prisma queries
export const VoteCreateSchema = z.object({
  name: z.string().max(25),
  state: z.enum([VoteState.ACTIVE, VoteState.CANCELLED, VoteState.COMPLETED]),
  views: z.number(),
  creatorId: z.string(),
});
