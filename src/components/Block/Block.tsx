import "./Block.style.scss";
import React from "react";

export interface Block {
  children?: React.ReactNode;
}
export const Block: React.FC<Block> = ({ children }) => <div className="block">{children}</div>;