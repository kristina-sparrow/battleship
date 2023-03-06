import React from "react";
import { Player } from "../../factories/Player";

type Cell = {
  status?: string;
  owner?: Player;
  isFilled?: boolean;
  onClick: () => void;
};

export default function Cell({ status, owner, isFilled, onClick }: Cell) {
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
