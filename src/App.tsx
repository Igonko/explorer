import React, { useState } from "react";
import Tree from "./components/Tree";
import { directory } from "./files/directory";
import { findLeaf } from "./helpers/findLeaf";
import { Variant } from "./types/enums";
import { Leaf } from "./types/types";

const App: React.FC = () => {
  const [initial, setInitial] = useState<Leaf>(directory);

  const addNewLeaf = (type: string, id: number) => {
    const updatedDirectory = initial;
    const newLeaf = {
      id: Date.now(),
      name: type === "file" ? "new file" : "new folder",
      type,
      files: type === "file" ? undefined : [],
    };

    if (updatedDirectory.id !== id && updatedDirectory.files) {
      findLeaf(updatedDirectory, id, Variant.CREATE, newLeaf);
    }
    if (updatedDirectory.id === id) {
      updatedDirectory.files && updatedDirectory.files.push(newLeaf);
    }

    setInitial({ ...updatedDirectory });
  };

  const renameLeaf = (id: number, name: string) => {
    const updatedDirectory = initial;

    if (!name) {
      return;
    }

    if (updatedDirectory.id === id) {
      updatedDirectory.name = name;
    } else {
      updatedDirectory.files &&
        findLeaf(updatedDirectory, id, Variant.RENAME, undefined, name);
    }

    setInitial({ ...updatedDirectory });
  };

  return (
    <Tree directory={initial} addNewLeaf={addNewLeaf} renameLeaf={renameLeaf} />
  );
};

export default App;
