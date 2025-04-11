import { Store } from "@/app/store/Store";
import { DialogRemove } from "@/components/Organization/Dialog/DialogRemove";
import { DialogRename } from "@/components/Organization/Dialog/DialogRename";

export enum DialogboxType { ORGREMOVE, ORGRENAME }

export const openDialogbox = (type: DialogboxType) => {
  if (type === DialogboxType.ORGRENAME) Store.Dialogbox.setContent(DialogRename);
  if (type === DialogboxType.ORGREMOVE) Store.Dialogbox.setContent(DialogRemove);
  Store.Dialogbox.open();
}