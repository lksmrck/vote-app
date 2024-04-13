import React from "react";
import { useParams } from "react-router";

const VoteDetail = () => {
  const { id } = useParams();
  return <div>Vote ID je: {id}</div>;
};

export default VoteDetail;
