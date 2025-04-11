import "./Dialogbox.style.scss";
import { Store } from "@/app/store/Store";
import { useClickOutside } from "@reactuses/core";
import { observer } from "mobx-react-lite";
import React from "react";

export interface Dialogbox {
  children?: React.ReactNode;
  isOpen?: boolean;
}
export const Dialogbox: React.FC<Dialogbox> = observer(() => {
  const ref = React.useRef<HTMLDivElement>(null);
  const Content = Store.Dialogbox.content;
  useClickOutside(ref, () => {
    Store.Dialogbox.setContent(() => null);
    Store.Dialogbox.close();
  });
  return Store.Dialogbox.isOpened && <div className="dialogbox">
    <div className="dialogbox__background"></div>
    <div className="dialogbox__content" ref={ref}><Content /></div>
  </div>
})