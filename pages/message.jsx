import { PublishCommand } from "@aws-sdk/client-sns";
import { snsClient } from "./api/client.js";

export default function Message() {
  async function SendMessage() {
    const message = document.getElementById("message").value;
    const subject = document.getElementById("subject").value;

    var params = {
      Subject: subject,
      Message: message,
      TopicArn: "arn:aws:sns:us-east-1:499271243791:boldr-aws", 
    };

    try {
      const data = await snsClient.send(new PublishCommand(params));
      alert("Message Sent Successfully!!");
      document.getElementById("message").value = "";
      document.getElementById("subject").value = "";
      console.log("Success.", data);
      return data;
    } catch (err) {
      alert("Error Sending Message");
      console.log("Error", err.stack);
    }
  }

  return (
    <div className="main">
      <h1>Type Your Message</h1>
      <textarea cols="50" rows="2" placeholder="Subject" type="text" id="subject" />
      <br />
      <textarea cols="50" rows="10" placeholder="Enter Message" id="Message" />
      <br />
      <button onClick={() => SendMessage()}>Send Message</button>
    </div>
  );
}
