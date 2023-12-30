import fs from "fs";
import path from "path";
//🍡🍡[API ROUTES]🍡🍡

export function buildFeedbackPath() {
  return path.join(process.cwd(), "data", "feedback.json"); ////creating the 'path', 'connection' with our DataBase file
} //🦧🦧[GETTING DATA WITH API]🦧🦧 here we are just creating a function that store a code that we will use it in multiple places and we want to avoid code duplicates, so we will only call that function 'buildFeedbackPath'
//👾👾[PRE-RENDERING API ROUTES]👾👾 to make the API Route work with Pre-rendering functions we must export this functions to have acces to them in out [FEEDBACK/index.js] file

export function extractFeedback(filePath) {
  const fileData = fs.readFileSync(filePath); //configuring the data that we receive
  const data = JSON.parse(fileData); //🍡🍡[API ROUTES]🍡🍡here we configure the data that we receive
  return data;
} //🦧🦧[GETTING DATA WITH API]🦧🦧 the same situation like the function from above, created to not have duplicate codes
//👾👾[PRE-RENDERING API ROUTES]👾👾 to make the API Route work with Pre-rendering functions we must export this functions to have acces to them in out [FEEDBACK/index.js] file

function handler(req, res) {
  // - res => this will sent back a response
  if (req.method === "POST") {
    const email = req.body.email; //🍡🍡[API ROUTES]🍡🍡those 2 variables are responsible of getting the data from the Input Field. The logic is that the 'req' will check if in our 'req' form exist some key words, in our exemple are: "email" and "text", if the 'handler' will found those 2 key words in the data base than those will be trigger, a dummy ex of backend model is:  {email: 'test@test.com', text: 'Some feedback text'} here we see the 'email' and the 'text'
    const feedbackText = req.body.text; // ==||== repeat the explenation from above, variable 'email'

    const newFeedback = {
      id: new Date().toISOString(),
      email: email,
      text: feedbackText,
    }; //🍡🍡[API ROUTES]🍡🍡now we can store that info in a database or in a file, etc

    //store that in a database or in a file
    const filePath = buildFeedbackPath(); //creating the 'path', 'connection' with our DataBase file
    // const fileData = fs.readFileSync(filePath); //configuring the data that we receive
    // const data = JSON.parse(fileData); //🍡🍡[API ROUTES]🍡🍡here we configure the data that we receive
    const data = extractFeedback(filePath); //🦧🦧[GETTING DATA WITH API]🦧🦧calling the function from above
    data.push(newFeedback);
    fs.writeFileSync(filePath, JSON.stringify(data));
    res.status(201).json({ message: "Success!", feedback: newFeedback });
  } else {
    const filePath = buildFeedbackPath(); //creating the 'path', 'connection' with our DataBase file
    const data = extractFeedback(filePath); //🦧🦧[GETTING DATA WITH API]🦧🦧calling the function from above
    res.status(200).json({ feedback: data }); //🍡🍡[API ROUTES]🍡🍡 here we configure that response, we sent a response and we want to get back a 'json' data info's
  }
}
//🍡🍡[API ROUTES]🍡🍡

export default handler;
