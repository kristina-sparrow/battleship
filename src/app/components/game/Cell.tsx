import React from "react";
import { IPlayer } from "../../factories/Player";

interface ICell {
  status?: string;
  owner?: IPlayer;
  isFilled?: boolean;
  onClick?: () => void;
}

export default function Cell({ status, owner, isFilled, onClick }: ICell) {
  function getClassName() {
    switch (status) {
      case "default":
        return "cell-default";
      case "ship":
        return "cell-ship";
      case "hit":
        return "cell-hit";
      case "missed":
        return "cell-missed";
      default:
        return "cell-default";
    }
  }
  return (
    <div className={getClassName()} onClick={onClick}>
      {status === "ship" && owner?.name !== "Computer" && (
        <div className="cell-ship-image" />
      )}
    </div>
  );
}
