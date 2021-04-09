import React from "react";
import UserCard from "./UserCard";
import BuildingCard from "./BuildingCard";

const Profil = ({ user }) => {
  return (
    <main>
      <section>
        <header>
          <h4>Mon profil</h4>
        </header>
        <div className="profil-cards-deck">
          <UserCard user={user} />
          <BuildingCard user={user} />
        </div>
      </section>
    </main>
  );
};

export default Profil;
