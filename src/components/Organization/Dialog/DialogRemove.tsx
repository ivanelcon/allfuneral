import { DialogWrapper } from "./DialogWrapper";
import { useDialog } from "./useDialog";

export interface DialogRemove {}
export const DialogRemove: React.FC<DialogRemove> = () => {
  
  const {onRemoveConfirm, onRemoveCancel} = useDialog();

  return <DialogWrapper
    title="Remove the Organization?"
    cancelText="No"
    confirmText="Yes, remove"
    onCancel={onRemoveCancel}
    onConfirm={onRemoveConfirm}>
      Are you sure you want to remove this Organization?
  </DialogWrapper>
}