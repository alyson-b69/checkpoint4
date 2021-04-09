import React from "react";

const TabsLinks = ({ activeTab, displaySignIn, displaySignUp }) => {
  return (
    <ul>
      <li>
        <button
          className={"tab-link " + (activeTab === "sign-in" ? "active" : "")}
          id="sign-in"
          onClick={displaySignIn}
        >
          SE CONNECTER
        </button>
      </li>
      <li>
        <button
          className={"tab-link " + (activeTab === "sign-up" ? "active" : "")}
          id="sign-up"
          onClick={displaySignUp}
        >
          S'INSCRIRE
        </button>
      </li>
    </ul>
  );
};

export default TabsLinks;
