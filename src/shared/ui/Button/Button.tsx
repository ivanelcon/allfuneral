import "./Button.style.scss";
import { ComponentProps } from "react";

export interface Button extends ComponentProps<"div"> {
  title: string;
  format?: "filled" | "outline" | "flattened";
  icon?: React.ReactNode;
}
 
export const Button: React.FC<Button> = ({ title, icon, format = "outline", ...props }) => {
  let resolvedButtonClassName = `button `;
  let resolvedButtonIconClassName = `button__icon `;
  if (format === "filled") {
    resolvedButtonClassName += "button--filled";
  }
  if (format === "outline"){
    resolvedButtonClassName += "button--outline";
  }
  if (format === "flattened") {
    resolvedButtonClassName += "button--flattened";
    resolvedButtonIconClassName += "button__icon--flattened";
  }
  return <div className={resolvedButtonClassName} {...props}>
    {icon && <div className={resolvedButtonIconClassName}>{icon}</div>}
    <div className="button__title">{title}</div>
  </div>;
}