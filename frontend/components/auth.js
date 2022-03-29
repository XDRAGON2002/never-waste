import { auth } from "../firebase/clientApp"
import {GoogleAuthProvider, EmailAuthProvider } from "firebase/auth"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"

import { Heading } from "@chakra-ui/react"
import { SettingsIcon } from "@chakra-ui/icons"

const uiConfig = {
    signInSuccessUrl: "/foodposts/",
    signInFlow: "popup",
    signInOptions: [EmailAuthProvider.PROVIDER_ID, GoogleAuthProvider.PROVIDER_ID],
};

const Auth = () => {

    return (
        <div>
            <Heading color="teal.700" size="4xl" m={4}><SettingsIcon /> Login / Signup</Heading>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
        </div>
    )
  }
  
  export default Auth;