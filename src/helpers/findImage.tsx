export const fileExtension = (name: string) => {
  const files = ["css", "js", "json", "ts", "tsx"];
  const images = ["jpg", "svg", "png"];
  const extension = name.split(".").pop();
  if (extension && files.includes(extension)) {
    return extension;
  }

  if (extension && images.includes(extension)) {
    return "img";
  }

  return "blank";
};

export const folderImage = (name: string, state: boolean) => {
  const folders = ["css", "img", "images", "src", "components"];

  if (folders.includes(name)) {
    return `${name === "img" || name === "images" ? "img" : name}-${
      state ? "opened" : "closed"
    }`;
  }

  return "empty";
};
