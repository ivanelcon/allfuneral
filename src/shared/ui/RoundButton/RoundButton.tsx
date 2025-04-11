import "./RoundButton.style.scss";
import { ComponentProps } from "react";

export interface RoundButton extends ComponentProps<"div">  {
  icon: React.ReactElement;
}
export const RoundButton: React.FC<RoundButton> = ({ icon, ...props }) => {
  return <div className="round-button" {...props}>{icon}</div>
}