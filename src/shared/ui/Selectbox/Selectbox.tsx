import "./Selectbox.style.scss";
import React from "react";
import ChevronIcon from "@/assets/Chevron.svg?react";
import { Checkbox } from "@/shared/ui/Checkbox/Checkbox";
import { useClickOutside } from "@reactuses/core";

export interface Selectbox {
  options: string[];
  optionsSelected?: string | string[];
  multiple?: boolean;
  onChange?: (selected: string[]) => void;
}
export const Selectbox: React.FC<Selectbox> = ({ options, optionsSelected, multiple, onChange }) => {
  const [opened, setOpened] = React.useState<boolean>(false);
  const [selected, setSelected] = React.useState<undefined | string>(typeof optionsSelected === "string" ? optionsSelected : undefined);
  const [selects, setSelects] = React.useState<Set<string>>(new Set(Array.isArray(optionsSelected) ? optionsSelected : []));
  const selectboxRef = React.useRef<HTMLDivElement>(null);
  const optionsClass = `selectbox__options${opened ? " selectbox__options--opened" : ""}`;
  const selectClass = `selectbox__select${opened ? " selectbox__select--opened" : ""}`;
  const resolveOptionClass = (option: string) => {
    return `selectbox__option${multiple ? " selectbox__option--multiple" : ""}${option === selected || selects.has(option) ? " selectbox__option--selected" : ""}`;
  }
  const clickEvent = () => setOpened(opened => !opened);
  const selectEvent = (option: string) => {
    if (multiple) {
      if (selects.has(option)) selects.delete(option);
      else selects.add(option);
      if (onChange) onChange(Array.from(selects.values()));
      return setSelects(new Set(selects));
    }
    if (onChange) onChange([option]);
    setSelected(option);
    setOpened(false);
  }
  const resolveSelectedOptions = () => multiple ? Array.from(selects.values()).join(", ") : selected;
  const resolveOptionContent = (option: string) => {
    if (multiple) {
      return <div className="selectbox__option-wrapper"><Checkbox id={option} name={option} value={option} checked={selects.has(option)} label={false} />{option}</div>
    }
    return option;
  }

  useClickOutside(selectboxRef, () => setOpened(false));

  return <div className="selectbox" ref={selectboxRef}>
    <button className={selectClass} onClick={clickEvent}>
      <span className="selectbox__selected">{resolveSelectedOptions()}</span>
      <span className="selectbox__arrow">
        <ChevronIcon width={16} height={16} stroke="black" />
      </span>
    </button>
    <ul className={optionsClass}>
      {options.map(option => <li className={resolveOptionClass(option)} onClick={() => selectEvent(option)} key={option}>{resolveOptionContent(option)}</li>)}
    </ul>
  </div>
}