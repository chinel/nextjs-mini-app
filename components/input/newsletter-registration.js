import { useContext, useRef } from "react";
import NotificationContext from "../../store/notification-context";
import classes from "./newsletter-registration.module.css";

function NewsletterRegistration() {
  const emailInputRef = useRef();

  const notificationCxt = useContext(NotificationContext);

  function registrationHandler(event) {
    event.preventDefault();

    // fetch user input (state or refs)
    // optional: validate input
    // send valid data to API

    notificationCxt.showNotification({
      title: "Signing up...",
      message: "Registering for newsletter.",
      status: "pending",
    });

    fetch("/api/newsletter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: emailInputRef.current.value }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        //for error messages that have a status code, by default won't make it to the catch block
        //So to make them make it to the catch block, we have to throw new error
        return response.json().then((data) => {
          throw new Error(data.message || "Something went wrong");
        });
      })
      .then((data) => {
        notificationCxt.showNotification({
          title: "Success",
          message: "Successfully registered for newsletter",
          status: "success ",
        });
        console.log(data);
      })
      .catch((err) => {
        notificationCxt.showNotification({
          title: "Error!  ",
          message: err.message || "Something went wrong",
          status: "error",
        });
      });
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={emailInputRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
