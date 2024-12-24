import React from "react";
import parse, { domToReact } from "html-react-parser";

export const TagRemover = () => {
  return optionsToRemovePTags = {
    replace: ({ name, children }) => {
      if (name === "p") {
        return <>{domToReact(children)}</>;
      }
    },
  };
};
