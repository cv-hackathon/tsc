import React, { useRef, useEffect, useState } from 'react'
import {Stack } from '@mui/material';

import "./Components/Styles/index.scss";
import "./Components/Styles/App.scss";
import Comment from "./Components/Comment";
import AddComment from "./Components/AddComment";

const CommentsComponent = ({ userInfo, data = [], updateData }) => {
  const [comments, updateComments] = useState([]);
    const [deleteModalState, setDeleteModalState] = useState(false);
    
    useEffect(() => {
        updateComments(data)
    }, [data])


//   useEffect(() => {
//     localStorage.getItem("comments") !== null
//       ? updateComments(JSON.parse(localStorage.getItem("comments")))
//       : getData();
//   }, []);

  useEffect(() => {
    // localStorage.setItem("comments", JSON.stringify(comments));
    deleteModalState
      ? document.body.classList.add("overflow--hidden")
      : document.body.classList.remove("overflow--hidden");
  }, [comments, deleteModalState]);
  
  // update score
  let updateScore = (score, id, type) => {
    let updatedComments = [...comments];

    if (type === "comment") {
      updatedComments.forEach((data) => {
        if (data.id === id) {
          data.score = score;
        }
      });
    } else if (type === "reply") {
      updatedComments.forEach((comment) => {
        comment.replies.forEach((data) => {
          if (data.id === id) {
            data.score = score;
          }
        });
      });
    }
    updateComments(updatedComments);
  };

  // add comments
  let addComments = (newComment) => {
    let updatedComments = [...comments, newComment];
    updateComments(updatedComments);
    updateData(updatedComments)
  };

  // add replies
  let updateReplies = (replies, id) => {
    let updatedComments = [...comments];
    updatedComments.forEach((data) => {
      if (data.id === id) {
        data.replies = [...replies];
      }
    });
    updateComments(updatedComments);
    updateData(updatedComments)
  };

  // edit comment
  let editComment = (content, id, type) => {
    let updatedComments = [...comments];

    if (type === "comment") {
      updatedComments.forEach((data) => {
        if (data.id === id) {
          data.content = content;
        }
      });
    } else if (type === "reply") {
      updatedComments.forEach((comment) => {
        comment.replies.forEach((data) => {
          if (data.id === id) {
            data.content = content;
          }
        });
      });
    }

    updateComments(updatedComments);
    updateData(updatedComments)
  };

  // delete comment
  let commentDelete = (id, type, parentComment) => {
    let updatedComments = [...comments];
    let updatedReplies = [];

    if (type === "comment") {
      updatedComments = updatedComments.filter((data) => data.id !== id);
    } else if (type === "reply") {
      comments.forEach((comment) => {
        if (comment.id === parentComment) {
          updatedReplies = comment.replies.filter((data) => data.id !== id);
          comment.replies = updatedReplies;
        }
      });
    }

    updateComments(updatedComments);
    updateData(updatedComments)
  };

  return (
    <Stack flexGrow={1}>
        {comments.map((comment) => (
            <Comment
            key={comment.id}
            commentData={comment}
            userInfo={userInfo}
            updateScore={updateScore}
            updateReplies={updateReplies}
            editComment={editComment}
            commentDelete={commentDelete}
            setDeleteModalState={setDeleteModalState}
            />
        ))}
        <AddComment buttonValue={"send"} addComments={addComments} userInfo={userInfo} />
    </Stack>
  );
};

export default CommentsComponent;



