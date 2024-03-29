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
