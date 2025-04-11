import "./DialogWrapper.style.scss";
import { Button } from "@/shared/ui/Button/Button";

export interface DialogWrapper {
  children?: React.ReactNode;
  title: string;
  cancelText: string;
  confirmText: string;
  onConfirm: () => void;
  onCancel: () => void;
}
export const DialogWrapper: React.FC<DialogWrapper> = ({
  children,
  title,
  cancelText,
  confirmText,
  onConfirm,
  onCancel
}) => {
  return <div className="dialog-wrapper">
    <div className="dialog-wrapper__title">{ title }</div>
    <div className="dialog-wrapper__content">
      {children}
    </div>
    <div className="dialog-wrapper__actions">
      <Button format="outline" title={cancelText} onClick={onCancel} />
      <Button format="filled" title={confirmText} onClick={onConfirm} />
    </div>
  </div>
}