import React, { useEffect, useState } from "react";
import { Leaf } from "../App";
import { fileExtension, folderImage } from "../helpers/findImage";
import ContextMenu from "./ContextMenu";
import "./style.css";

export enum LeafType {
  FILE = "file",
  FOLDER = "folder",
}

type Directory = {
  directory: Leaf;
  addNewLeaf: (type: string, id: number) => void;
};

const Tree: React.FC<Directory> = ({ directory, addNewLeaf }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleClick = () => setIsMenuOpen(false);
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  if (directory.type === LeafType.FOLDER) {
    return (
      <div className="folder">
        <h3
          className={`folder-name ${isOpen ? "opened" : "closed"}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <img
            className="leaf-icon"
            src={`/images/folder-${folderImage(directory.name, isOpen)}.svg`}
            alt={directory.name}
          />
          {directory.name}

          <img
            className="add-icon"
            src="/images/add-folder.svg"
            alt="add-folder"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addNewLeaf("folder", directory.id);
            }}
          />
          <img
            className="add-icon"
            src="/images/add-file.svg"
            alt="add-file"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addNewLeaf("file", directory.id);
            }}
          />

          <br />
        </h3>

        <ul>
          {isOpen &&
            directory.files?.map((file) => (
              <li key={file.id}>
                <Tree directory={file} addNewLeaf={addNewLeaf} />
              </li>
            ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="file">
      <h3
        className="file-name"
        onContextMenu={(e) => {
          e.preventDefault();
          setIsMenuOpen(true);
          setCoordinates({
            x: e.pageX,
            y: e.pageY,
          });
        }}
      >
        {isMenuOpen && <ContextMenu coordinates={coordinates} />}
        <img
          className="leaf-icon"
          src={`/images/${fileExtension(directory.name)}.svg`}
          alt={directory.name}
        />
        {directory.name}
      </h3>
    </div>
  );
};

export default Tree;
