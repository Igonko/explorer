import { Variant } from "../types/enums";
import { Leaf } from "../types/types";

export const findLeaf = (
  branch: Leaf,
  id: number,
  variant: Variant,
  newLeaf?: Leaf,
  name?: string
) => {
  branch.files &&
    branch.files.map((leaf) => {
      if (leaf.id !== id) {
        return findLeaf(leaf, id, variant, newLeaf, name);
      }

      if (newLeaf && variant === Variant.CREATE) {
        leaf.files && leaf.files.push(newLeaf);
      }

      if (name && variant === Variant.RENAME) {
        leaf.name = name;
      }

      return leaf;
    });
};
