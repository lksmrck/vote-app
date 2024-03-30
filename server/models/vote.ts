type VoteBase = {
  id: string;
  name: string;
  options: VoteOption[];
  state: "COMPLETED" | "ACTIVE" | "CANCELLED";
  createdAt: string;
};

interface Vote extends VoteBase {
  creatorId: string;
  creator: UserBase;
  views: number;
}

type VoteOption = {
  name: string;
  count: number;
  voters: UserBase[];
  voteId: string;
};
