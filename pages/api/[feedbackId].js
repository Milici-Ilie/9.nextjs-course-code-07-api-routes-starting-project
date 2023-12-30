import { buildFeedbackPath, extractFeedback } from "./feedback";
//📿📿[DYNAMIC API ID's]📿📿

function handler(req, res) {
  const feedbackId = req.query.feedbackId; //this 'feedbackId' represents this file itself
  const filePath = buildFeedbackPath();
  const feedbackData = extractFeedback(filePath); //📿📿[DYNAMIC API ID's]📿📿 here we take the data from the variable 'filePath' and convert it to the 'extractFeedback' function
  const selectedFeedback = feedbackData.find(
    (feedback) => feedback.id === feedbackId
  ); //📿📿[DYNAMIC API ID's]📿📿 here we are taking the 'feedbackData" and search for 'feedback.id' if is equal with the 'feedbackId' variable from above 👆 wich represents this file
  res.status(200).json({ feedback: selectedFeedback });
} //📿📿[DYNAMIC API ID's]📿📿 here we are returning the a response that will replace the "feedback" with a .json results "selectedFeedback" variable

export default handler; //📿📿[DYNAMIC API ID's]📿📿 now we can use this function in our API page/ [feedback/index.js]
