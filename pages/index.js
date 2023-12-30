import { useRef, useState } from "react";
//🍡🍡[API ROUTES]🍡🍡

function HomePage() {
  const [feedbackItems, setFeedbackItems] = useState([]); //🦧🦧[GETTING DATA WITH API]🦧🦧 used to display the info's/data from our request, we want to update the 'setFeedBackItems' with the "data" received from the function "loadFeedbackHandler()"

  const emailInputRef = useRef();
  const feedbackInputRef = useRef();

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value; //this is how we take the feedback/info's that the User introduce in the inputs and now we must use that data, check the 'feedback.js' file
    const enteredFeedback = feedbackInputRef.current.value;

    const reqBody = { email: enteredEmail, text: enteredFeedback }; //🚙🚙[REQUESTS TO API ROUTES]🚙🚙 connecting the variables 'enteredEmail' and 'enteredFeedback' with the key names "email:..." and "text:..."

    fetch("/api/feedback", {
      method: "POST", //🚙🚙[REQUESTS TO API ROUTES]🚙🚙 NOTE!!! here we are creating the 'path' added to the URL and connect with the Forlder 'api' and the file 'feedback.js'. NOTE!!! We also need to specifie a 'method', in our case is 'POST' method because this is the name that we give it in the 'feedback.js' file in the 'handler' function where we tell 'if(req.method === 'POST') {... check the code to see how we transform the received data...}'
      body: JSON.stringify(reqBody), //🚙🚙[REQUESTS TO API ROUTES]🚙🚙 here we are taking the data from the variable "reqBody" and transform it in to a 'JSON' string
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data)); //extracting the respponse/data
  } //🚙🚙[REQUESTS TO API ROUTES]🚙🚙now the data that will be received from this API Routes will be stored in our BACKEND/ DATA-BASE file [DATA/feedback.json] in a JSON format ====În general, atunci când vorbim despre formatul de date sau schimbul de date, folosim "JSON" cu majuscule. Când ne referim la extensia de fișier sau la nume de fișiere care conțin date în format JSON, folosim "json" cu litere mici.

  function loadFeedbackHandler() {
    fetch("/api/feedback")
      .then((response) => response.json())
      .then((data) => setFeedbackItems(data.feedback)); //extracting the respponse/data in our 'useState' from above === NOTE!!! that the 'data' will return the "feedback: data" from the "else" block from the "API/feedback.js" received from the 'feedback.json' Database/Backend file that we created
  } //🦧🦧[GETTING DATA WITH API]🦧🦧 this is the function that will sent a request for the data and display it to the User === check the <button>...</button> from bellow

  return (
    <div>
      <h1>The Home Page</h1>
      <form onSubmit={submitFormHandler}>
        <div>
          <label htmlFor="email">Your Email Address</label>
          <input type="email" id="email" ref={emailInputRef} />
        </div>
        <div>
          <label htmlFor="feedback">Your feedback</label>
          <textarea id="feedback" rows="5" ref={feedbackInputRef}></textarea>
        </div>
        <button>Send Feedback</button>
      </form>
      <hr />
      <button onClick={loadFeedbackHandler}>Send Feedback</button>
      <ul>
        {feedbackItems.map((item) => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
      {/* 🦧🦧[GETTING DATA WITH API]🦧🦧 here we are displaying the data received from our <button/> request from above */}
    </div>
  ); //🍡🍡[API ROUTES]🍡🍡
}

export default HomePage;
