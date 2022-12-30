import React from "react";

type Coordinates = {
  coordinates: Record<string, number>;
};

const ContextMenu: React.FC<Coordinates> = ({ coordinates }) => {
  return (
    <div
      className="context-menu"
      style={{ left: coordinates.x, top: coordinates.y }}
    >
      <ul>
        <li>Rename</li>
        <li>Delete</li>
      </ul>
    </div>
  );
};

export default ContextMenu;
