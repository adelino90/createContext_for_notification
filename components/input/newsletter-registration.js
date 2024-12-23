import { useRef } from 'react';
import classes from './newsletter-registration.module.css';
import { LoadMessage,CloseLoad } from '../ui/loading';
import Notify from '../ui/notify';


function NewsletterRegistration() {
  const emailInput = useRef()
  function registrationHandler(event) {
    event.preventDefault();
    const emailEntered = emailInput.current.value
    const loadId = LoadMessage();
    fetch('/api/newsletter',{
      method:'POST',
      body:JSON.stringify({ email : emailEntered }),
      headers:{
        'Content-Type':'application/json',
      }
    }).then( response => response.json() )
    .then(data => {
      console.log(data)
      if(data.result.acknowledged){
        const tostrresult = Notify('Success!')
        CloseLoad(loadId);
        emailInput.current.value="";
      }

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
