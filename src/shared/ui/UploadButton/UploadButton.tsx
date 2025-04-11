import "./UploadButton.style.scss";
import UploadIcon from "@/assets/Add Photo.svg?react";
import { Button } from "@/shared/ui/Button/Button";
import { ComponentProps } from "react";

export interface UploadButton extends ComponentProps<"div"> {
  title: string;
  onFileAdded?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export const UploadButton: React.FC<UploadButton> = ({ title, onFileAdded, ...props }) => {
  const id = String(Math.random()).split(".")[1];
  return <div>
    <input type="file" id={id} onChange={onFileAdded} accept=".jpg, .jpeg, .png" hidden />
    <label htmlFor={id}>
      <Button icon={<UploadIcon stroke="#3B3B3B" width={16} height={16} />} title={title} format="flattened" {...props} />
    </label>
  </div>
}