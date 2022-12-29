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

  const addNewLeaf = (name: string, type: string, id: number) => {
    const newLeaf = {
      id: Date.now(),
      name,
      type,
      files: type === "file" ? undefined : [],
    };

    const newDirectory = {
      ...initial,
      newLeaf,
    };

    setInitial(newDirectory);
  };

  console.log(initial);

  return <Tree directory={initial} addNewLeaf={addNewLeaf} />;
};

export default App;
