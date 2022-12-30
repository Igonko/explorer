import React, { useState } from "react";
import Tree from "./components/Tree";
import { directory } from "./files/directory";

export type Leaf = {
  id: number;
  name: string;
  type: string;
  files?: Leaf[];
};

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
      const findLeaf = (branch: Leaf) => {
        branch.files &&
          branch.files.map((leaf) => {
            if (leaf.id !== id) {
              return findLeaf(leaf);
            }

            leaf.files && leaf.files.push(newLeaf);

            return leaf;
          });
      };

      findLeaf(updatedDirectory);
    }
    if (updatedDirectory.id === id) {
      updatedDirectory.files && updatedDirectory.files.push(newLeaf);
    }

    setInitial({ ...updatedDirectory });
  };

  return <Tree directory={initial} addNewLeaf={addNewLeaf} />;
};

export default App;
