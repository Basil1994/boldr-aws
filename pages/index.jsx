import {SubscribeCommand,ListSubscriptionsByTopicCommand,} from "../node_modules/@aws-sdk/client-sns";
import { snsClient } from "./api/client.js";

export default function Home({ SubscribeNumbers }) {
  async function Register() {
    const email = document.querySelector("#userEmail").value;

    const params = {
      Protocol: "email" /* required */,
      TopicArn: "arn:aws:sns:us-east-1:499271243791:boldr-aws",
      Endpoint: email,
    };

    try {
      const data = await snsClient.send(new SubscribeCommand(params));
      alert("Your Have Been Subscribed!");
      document.querySelector("#userEmail").innerHTML = "";
      console.log("Success.", data);
      return data;
    } catch (err) {
      alert("Invalid Type Try Again!");
      console.log("Error", err.stack);
    }
  }

  return (
    <div className="main">
      <h1>Boldr Trends</h1>

      <input id="userEmail" type="email" placeholder="Type Email" />
      <button onClick={() => Register()}>SUBSCRIBE</button>
            <p>

              <strong>
                Active Readers <span id="SubscribeNumbers"> {SubscribeNumbers}</span>
              </strong>
            </p>
    </div>
  );
}

export async function getStaticProps() {

  const params = {
    TopicArn: "arn:aws:sns:us-east-1:499271243791:boldr-aws",}; 

  const data = await snsClient.send(
    new ListSubscriptionsByTopicCommand(params)
  );
  const subs = data.Subscriptions;
  const qtd = subs.filter(function (sub) {
    return sub.SubscriptionArn === "PendingConfirmation" && "Deleted";
  });
  const SubscribeNumbers = subs.length - qtd.length;

  return {
    props: { SubscribeNumbers },
  };
}
