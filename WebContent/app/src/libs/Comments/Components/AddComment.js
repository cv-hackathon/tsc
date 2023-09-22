import { useState } from "react";
import { Avatar, Stack } from '@mui/material';

import "./Styles/AddComment.scss";

const AddComment = ({ buttonValue, addComments, replyingTo, userInfo }) => {
  const replyingToUser = replyingTo ? `@${replyingTo}, ` : "";
  const [comment, setComment] = useState("");

  const clickHandler = () => {
    if (comment === "" || comment === " ") return;

    const newComment = {
      id: Math.floor(Math.random() * 100) + 5,
      content: replyingToUser + comment,
      createdAt: new Date(),
      score: 0,
      username: userInfo.name,
      currentUser: true,
      replies: [],
    };

    addComments(newComment);
    setComment("");
  };

  return (
    <div className="add-comment">
      <Avatar className="profile-pic" src={`https://ui-avatars.com/api/name=${userInfo.name}&background=random`} sx={{width: 30, height: 30, mr: '10px'}} />
      <textarea
        className="comment-input"
        placeholder="Add a comment"
        value={replyingToUser + comment}
        onChange={(e) => {
          setComment(
            e.target.value.replace(replyingTo ? `@${replyingTo}, ` : "", "")
          );
        }}
      />
      <div className="send-btn-container">
        <Avatar className="profile-pic" src={`https://ui-avatars.com/api/name=${userInfo.name}&background=random`} sx={{width: 30, height: 30, mr: '10px'}} />
        <button className="add-btn" onClick={clickHandler}>
          {buttonValue}
        </button>
      </div>
    </div>
  );
};

export default AddComment;
