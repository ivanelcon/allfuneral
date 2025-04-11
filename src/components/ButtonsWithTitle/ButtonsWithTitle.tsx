import "./ButtonsWithTitle.style.scss";
import EditIcon from "@/assets/Edit.svg?react";
import CheckIcon from "@/assets/Check.svg?react";
import XIcon from "@/assets/X.svg?react";
import { Button } from "@/shared/ui/Button/Button";
import { UploadButton } from "@/shared/ui/UploadButton/UploadButton";

export interface ButtonsWithTitle {
  title: string;
  editingMode?: boolean;
  renderUploadButton?: boolean;
  onEditClick?: () => void;
  onSaveClick?: () => void;
  onXClick?: () => void;
  onFileAdded?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export const ButtonsWithTitle: React.FC<ButtonsWithTitle> = ({
  renderUploadButton,
  title,
  editingMode,
  onEditClick,
  onSaveClick,
  onXClick,
  onFileAdded
}) => {
  let buttons = undefined;
  if (renderUploadButton) {
    buttons = <UploadButton title="Add" onFileAdded={onFileAdded} />;
  }
  else {
    if (editingMode) {
      buttons = <div className={"button-with-title__buttons"}>
        <Button onClick={onSaveClick} icon={<CheckIcon stroke="#3B3B3B" width={16} height={16} />} title="Save changes" format="flattened" />
        <Button onClick={onXClick} icon={<XIcon stroke="#3B3B3B" width={16} height={16} />} title="Cancel" format="flattened" />
      </div>;
    }
    else {
      buttons = <Button onClick={onEditClick} icon={<EditIcon stroke="#3B3B3B" width={16} height={16} />} title="Edit" format="flattened" />;;
    }
  }
  return <div className="button-with-title">
    <div>{title}</div>
    {buttons}
  </div>
}