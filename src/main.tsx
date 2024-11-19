import React from "react";
import ReactDOM from "react-dom/client";
import { Authenticator } from '@aws-amplify/ui-react'; //setp3 login function part1
import App from "./App.tsx";
import "./index.css";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import '@aws-amplify/ui-react/styles.css';//setp4 login function part2

Amplify.configure(outputs);

ReactDOM.createRoot(document.getElementById("root")!).render(
  //setp5 login function part3
  //step9 signUpAttributes={['name']} to have username
  <React.StrictMode>
    <Authenticator signUpAttributes={[
        'name',
    ]}>
      <App />
    </Authenticator>
  </React.StrictMode>
);
