import { ComponentProps } from "react";
import "./Input.style.scss";

export interface Input extends ComponentProps<"input"> {
  name: string;
  value: string;
}
export const Input: React.FC<Input> = ({ name, value, ...props }) => {
  return <input className="input" type="text" name={name} value={value} {...props} />
}