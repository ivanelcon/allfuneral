import "./Actions.style.scss";
import React from "react";
import ChevronIcon from "@/assets/Chevron.svg?react";
import EditIcon from "@/assets/Edit.svg?react";
import TrashIcon from "@/assets/Trash.svg?react";
import { observer } from "mobx-react-lite";
import { Store } from "@/app/store/Store";
import { RoundButton } from "@/shared/ui/RoundButton/RoundButton";
import { DialogboxType, openDialogbox } from "@/shared/utils/openDialogbox";
import { useNavigate, useParams } from "react-router";

export interface Actions {}
export const Actions: React.FC<Actions> = observer(() => {
  const navigate = useNavigate();
  const params = useParams();
  const id = String(params.id);
  const organization = Store.Organization.organizations[id];
  return organization && <div className="actions">
    <div className="actions__text">
      <RoundButton onClick={() => navigate(-1)} icon={<ChevronIcon stroke="#3B3B3B" width={20} height={20} />} />
      {organization.name}
    </div>
    <div className="actions__actions">
      <RoundButton onClick={() => openDialogbox(DialogboxType.ORGRENAME)} icon={<EditIcon stroke="#3B3B3B" width={20} height={20} />} />
      <RoundButton onClick={() => openDialogbox(DialogboxType.ORGREMOVE)} icon={<TrashIcon stroke="#D72323" width={20} height={20} />} />
    </div>
</div>
})