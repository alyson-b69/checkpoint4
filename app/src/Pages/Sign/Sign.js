import React, { useState } from "react";
import TabsLinks from "./TabsLinks";
import TabSignIn from "./TabSignIn";
import TabSignUp from "./TabSignUp";
import "../../assets/styles/Sign.css";

const Sign = ({ setToken, setUserId }) => {
  const [activeTab, setActiveTab] = useState("sign-in");
  const [successMessage, setSuccessMessage] = useState(null);

  const displaySignIn = (message = null) => {
    if (message) {
      setSuccessMessage(message);
    }
    setActiveTab("sign-in");
  };

  const displaySignUp = () => {
    setActiveTab("sign-up");
  };

  return (
    <main id="sign-container">
      <div id="sign">
        <TabsLinks
          displaySignIn={displaySignIn}
          displaySignUp={displaySignUp}
          activeTab={activeTab}
        />
        <TabSignIn
          successMessage={successMessage}
          activeTab={activeTab}
          setTokenApp={setToken}
          setUserIdApp={setUserId}
        />
        <TabSignUp displaySignIn={displaySignIn} activeTab={activeTab} />
      </div>
    </main>
  );
};

export default Sign;
