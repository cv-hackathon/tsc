import CommentBtn from "./CommentBtn";
import { Avatar } from '@mui/material';

const CommentHeader = ({commentData, setReplying, setDeleting, setDeleteModalState, setEditing, time}) => {
  return (
    <div className="comment--header">
      <Avatar className="profile-pic" src={`https://ui-avatars.com/api/name=${commentData.username}&background=random`} sx={{width: 30, height: 30, mr: '10px'}} />
      <div className="username">{commentData.username}</div>
      {commentData.currentUser ? <div className="you-tag">you</div> : ""}
      <div className="comment-posted-time">{`${time} ago`}</div>
      <CommentBtn
        commentData={commentData}
        setReplying={setReplying}
        setDeleting={setDeleting}
        setDeleteModalState={setDeleteModalState}
        setEditing={setEditing}
      />
    </div>
  );
};

export default CommentHeader;
