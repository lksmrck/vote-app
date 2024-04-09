export type VoteBase = {
  id?: string;
  name: string;
  options: VoteOptionBase[];
  state: "COMPLETED" | "ACTIVE" | "CANCELLED";
  createdAt?: string;
};

export interface Vote extends VoteBase {
  creatorId: string;
  creator?: UserBase;
  views: number;
}

export type VoteOptionBase = {
  name: string;
  count?: number;
  voters?: UserBase[];
  voteId?: string;
};

type UserBase = {
  id: string;
  name: string;
  email: string;
};

interface User extends UserBase {
  votesCreated: VoteBase[];
  votesVoted: VoteBase[];
  // votes:
}
