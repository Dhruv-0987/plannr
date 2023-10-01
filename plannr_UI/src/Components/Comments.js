import React from "react";
import Rating from "@mui/material/Rating";

const Comment = ({ comment }) => {
  return (
    <div className="flex justify-between items-center border border-gray-300 p-3 rounded-md shadow-md">
      <p className="flex-1 mr-4">{comment.comments}</p>
      <div>
        <Rating
          name={`rating-${comment.id}`}
          value={comment.rating}
          precision={0.5}
          readOnly
          style={{ color: "darkgreen" }}
        />
      </div>
    </div>
  );
};

function Comments({ comments }) {
  return (
    <div className="flex justify-between items-center flex-col p-5 space-y-4">
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
}

export default Comments;
