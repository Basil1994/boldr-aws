import  { SNSClient } from "@aws-sdk/client-sns";
import { CognitoIdentityClient } from "../../node_modules/@aws-sdk/client-cognito-identity";
import {fromCognitoIdentityPool} from "../../node_modules/@aws-sdk/credential-provider-cognito-identity";



const REGION = "us-east-1"; 

const snsClient = new SNSClient({ region: REGION,
credentials: fromCognitoIdentityPool({
    client: new CognitoIdentityClient ({
        region: REGION,
        }),
    identityPoolId: "us-east-1:9d8a2827-7231-4b66-b36a-31015e536a18",
}),
});
export  { snsClient };
 