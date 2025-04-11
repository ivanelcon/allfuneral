import { ComponentProps } from "react";
import "./Checkbox.style.scss";

interface Checkbox extends ComponentProps<"input"> {
  id: string;
  name: string;
  value: string;
  label?: boolean;
}
export const Checkbox: React.FC<Checkbox> = ({ id, name, value, label = true, ...props }) => {
  const checkboxId = `checkbox-${id}`;
  return <div className="checkbox">
    <div className="checkbox__input-wrapper">
      <input className="checkbox__input" type="checkbox" id={checkboxId} name={name} value={value} {...props} />
    </div>
    {label && <label className="checkbox__label" htmlFor={checkboxId}>{value}</label>}
  </div>
}