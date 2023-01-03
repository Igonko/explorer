import React from "react";
import { ContextMenuProps } from "../types/types";

const ContextMenu: React.FC<ContextMenuProps> = ({ coordinates }) => {
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
