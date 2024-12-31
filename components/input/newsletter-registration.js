import { useRef, useContext } from 'react';
import classes from './newsletter-registration.module.css';
import { LoadMessage,CloseLoad } from '../ui/loading';
import Notify from '../ui/notify';
import NotificationContext from '../../store/notification-context';

function NewsletterRegistration() {
  const emailInput = useRef()
  const notifcontext = useContext(NotificationContext);
  function registrationHandler(event) {
    event.preventDefault();
    const emailEntered = emailInput.current.value
    //const loadId = LoadMessage();
    notifcontext.showNotification({
      title:'Signing Up',
      message:'Registering News-Letter',
      status:'pending'
    })
    fetch('/api/newsletter',{
      method:'POST',
      body:JSON.stringify({ email : emailEntered }),
      headers:{
        'Content-Type':'application/json',
      }
    }).then( response => {
      if(response.ok)
        return response.json() 

      return response.json().then(data => {
        throw new Error(data.message || 'Something went wrong!')
      })
    })
    .then(data => {
      console.log(data)
      if(data.result.acknowledged){
        notifcontext.showNotification({
          title:'Success!',
          message:'Successfully Registered News-Letter',
          status:'success'
        })
        
        //const tostrresult = Notify('Success!')
        //CloseLoad(loadId);
        emailInput.current.value="";
      }

    }).catch(error=>{
      notifcontext.showNotification({
        title:'Error',
        message:error.message || 'something went shit',
        status:'error'
      })
    });
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
            ref={emailInput}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
