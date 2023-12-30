import { Fragment, useState } from "react";
import { buildFeedbackPath, extractFeedback } from "../api/feedback"; //👾👾[PRE-RENDERING API ROUTES]👾👾

function FeedbackPage(props) {
  const [feedbackData, setFeedbackData] = useState(); //📿📿[DYNAMIC API ID's]📿📿

  function loadFeedbackHandler(id) {
    fetch(`/api/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setFeedbackData(data.feedback);
      }); // /api/some-feedback-id
  } //📿📿[DYNAMIC API ID's]📿📿

  return (
    <Fragment>
      {feedbackData && <p>{feedbackData.email}</p>}
      <ul>
        {props.feedbackItems.map((item) => (
          <li key={item.id}>
            {item.text}
            <button onClick={loadFeedbackHandler.bind()}>Show Details</button>
          </li> //📿📿[DYNAMIC API ID's]📿📿 the Button that will display Dynamic content depeding on the unique ID ...... '.bind()' will bind our Button with the function 'loadFeedbackHandler'
        ))}
      </ul>
    </Fragment>
  );
}

export async function getStaticProps() {
  const filePath = buildFeedbackPath();
  const data = extractFeedback(filePath);
  return {
    props: {
      feedbackItems: data,
    },
  };
}

export default FeedbackPage;
//👾👾[PRE-RENDERING API ROUTES]👾👾
