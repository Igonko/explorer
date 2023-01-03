export type Leaf = {
  id: number;
  name: string;
  type: string;
  files?: Leaf[];
};

export type ContextMenuProps = {
  coordinates: Record<string, number>;
};
