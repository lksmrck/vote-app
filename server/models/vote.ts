type VoteBase = {
  id: string;
  name: string;
  options: VoteOption[];
  state: "Completed" | "Ongoing" | "Cancelled";
};

interface Vote extends VoteBase {
  creatorId: string;
  creatorName: string;
  views: number;
}

type VoteOption = {
  name: string;
  count: number;
  voters: UserBase[];
};
