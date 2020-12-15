import React from "react";

const Residents = ({ building }) => {
  return (
    <aside>
      <header>
        <h4>Résidents</h4>
      </header>
      <ul>
        {building ? (
          building.residents.map((resident) => {
            return (
              <li key={resident.id}>
                {resident.lastname.toUpperCase()} {resident.firstname}
              </li>
            );
          })
        ) : (
          <li>Pas de résidents</li>
        )}
      </ul>
    </aside>
  );
};

export default Residents;
