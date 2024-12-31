import { useEffect, useState,useContext } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';
import { LoadMessage,CloseLoad } from '../ui/loading';
import Notify from '../ui/notify';
import Error from '../ui/errorMessage';
import NotificationContext from '../../store/notification-context';

function Comments(props) {
  const { eventId } = props;
  const [showComments, setShowComments] = useState(false);
  const [comments,setComments] = useState([])
  const notifcontext = useContext(NotificationContext);
  const [isFetchingComments,setisFetchingComments] = useState(false)
  useEffect(() =>{
    if(showComments){
      setisFetchingComments(true)
      fetch('/api/comments/' + eventId,{})
      .then(response => response.json())
      .then(data =>{
       setComments(data.comments);
       setisFetchingComments(false)
      })
    }
  },[showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  async function addCommentHandler(commentData) {
    //const loadId = LoadMessage();
    try {
        notifcontext.showNotification({
          title:'Submitting Comment...',
          message:'Saving Comment',
          status:'pending'
        })
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
              notifcontext.showNotification({
                title:'Success!',
                message:'Successfully Submitted Comment',
                status:'success'
              })
            
              //Notify('Comment Submitted!');
              //CloseLoad(loadId);
              return true; // Indicate success
          } else {
           //Error(data.message);
              //CloseLoad(loadId);
              notifcontext.showNotification({
                title:'Error',
                message:data.message || 'something went shit',
                status:'error'
              })
              return false; // Indicate failure
          }
        }
        else{
          //Error(data.message);
          //CloseLoad(loadId);
          return false; // Indicate failure
        }
    } catch (error) {
        console.error('Error:', error);
        notifcontext.showNotification({
          title:'Error',
          message:error.message || 'something went shit',
          status:'error'
        })
        //Notify('An error occurred!');
        //CloseLoad(loadId);
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
      {isFetchingComments && <p>Loading Comments...</p>}
    </section>
  );
}

export default Comments;
