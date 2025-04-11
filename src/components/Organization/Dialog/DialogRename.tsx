import React from "react";
import { Input } from "@/shared/ui/Input/Input";
import { DialogWrapper } from "./DialogWrapper";
import { useDialog } from "./useDialog";

export interface DialogRename {}
export const DialogRename: React.FC<DialogRename> = () => {
  const {onRenameConfirm, onRenameCancel, onRenameChange, value} = useDialog();
  return <DialogWrapper
    title="Specify the Organization's name"
    cancelText="Cancel"
    confirmText="Save Changes"
    onConfirm={onRenameConfirm}
    onCancel={onRenameCancel}>
      <Input name="organization-rename" value={value} onChange={onRenameChange} />
  </DialogWrapper>
}