import React, { useState } from "react";
import { Leaf } from "../App";
import { fileExtension, folderImage } from "../helpers/findImage";
import "./style.css";

export enum LeafType {
  FILE = "file",
  FOLDER = "folder",
}

type Directory = {
  directory: Leaf;
  addNewLeaf: (name: string, type: string, id: number) => void;
};

const Tree: React.FC<Directory> = ({ directory, addNewLeaf }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (directory.type === LeafType.FOLDER) {
    return (
      <div className='folder'>
        <h3
          className={`folder-name ${isOpen ? "opened" : "closed"}`}
          onClick={() => setIsOpen(!isOpen)}>
          <img
            className='leaf-icon'
            src={`/images/folder-${folderImage(directory.name, isOpen)}.svg`}
            alt={directory.name}
          />
          {directory.name}

          <img
            className='add-icon'
            src='/images/add-folder.svg'
            alt='add-folder'
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
            }}
          />
          <img
            className='add-icon'
            src='/images/add-file.svg'
            alt='add-file'
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
            }}
          />

          <br />
        </h3>

        <ul>
          {isOpen &&
            directory.files?.map(file => (
              <li key={file.id}>
                <Tree directory={file} addNewLeaf={addNewLeaf} />
              </li>
            ))}
        </ul>
      </div>
    );
  }

  return (
    <div className='file'>
      <h3 className='file-name'>
        <img
          className='leaf-icon'
          src={`/images/${fileExtension(directory.name)}.svg`}
          alt={directory.name}
        />
        {directory.name}
      </h3>
    </div>
  );
};

export default Tree;
