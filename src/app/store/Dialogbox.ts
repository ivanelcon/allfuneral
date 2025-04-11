import { makeAutoObservable } from "mobx";
import React from "react";

export interface DialogboxStore {
  isOpened: boolean;
  content: React.FC;
  setContent: (content: React.FC) => void;
  close: () => void;
  open: () => void;
}
export function createDialogboxStore() {
  return makeAutoObservable<DialogboxStore>({
    isOpened: false,
    content: () => null,
    setContent(content) {
      this.content = content;
    },
    close() {
      this.content = () => null;
      this.isOpened = false;
    },
    open() {
      this.isOpened = true;
    }
  })
}