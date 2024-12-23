import { useEffect, useState } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';
import { LoadMessage,CloseLoad } from '../ui/loading';
import Notify from '../ui/notify';
import Error from '../ui/errorMessage';
function Comments(props) {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const [comments,setComments] = useState([])
  useEffect(() =>{
    if(showComments){
      fetch('/api/comments/' + eventId,{})
      .then(response => response.json())
      .then(data =>{
       setComments(data.comments);
      })
    }
  },[showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  async function addCommentHandler(commentData) {
    const loadId = LoadMessage();
    try {
        const res = await fetch(`/api/comments/${eventId}`, {
            method: 'POST',
            body: JSON.stringify({ commentData }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await res.json();
        if(data.success){
          if (data.result.acknowledged) {
              Notify('Comment Submitted!');
              CloseLoad(loadId);
              return true; // Indicate success
          } else {
            Error(data.message);
              CloseLoad(loadId);
              return false; // Indicate failure
          }
        }
        else{
          Error(data.message);
          CloseLoad(loadId);
          return false; // Indicate failure
        }
    } catch (error) {
        console.error('Error:', error);
        Notify('An error occurred!');
        CloseLoad(loadId);
        return false; // Indicate failure
    }
}

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList items={comments}/>}
    </section>
  );
}

export default Comments;
