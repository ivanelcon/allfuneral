import { Store } from "@/app/store/Store";
import { API } from "@/app/api";
import { useNavigate, useParams } from "react-router";
import { enqueueSnackbar } from "notistack";
import React from "react";

export const useDialog = () => {
  const params = useParams();
  const navigate = useNavigate();
  const id = String(params.id);
  const organization = Store.Organization.organizations[id];
  const [value, setValue] = React.useState(organization?.name || "");

  const onRemoveConfirm = async () => {
    try {
      await API.Organization.delete(Number(id));
      navigate("/organizations");
      Store.Organization.delete(id);
      Store.Dialogbox.close();
      enqueueSnackbar("Organization removed!", {variant: "success"});
    }
    catch(error) {
      enqueueSnackbar("Cannot remove organization", {variant: "error"});
    }
  }
  
  const onRenameConfirm = async () => {
    try {
      const name = value;
      const response = await API.Organization.update(Number(id), {name});
      if ("error" in response) return enqueueSnackbar(response.error, {variant: "error"});
      Store.Organization.rename(id, name);
      Store.Dialogbox.close();
      enqueueSnackbar("Organization renamed!", {variant: "success"});
    }
    catch(error) {
      enqueueSnackbar("Rename failed", {variant: "error"});
    }
  }
  const onRenameChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
  }

  const onRemoveCancel = () => Store.Dialogbox.close();
  const onRenameCancel = onRemoveCancel;

  return {
    value,
    organization,
    onRemoveConfirm,
    onRemoveCancel,
    onRenameConfirm,
    onRenameCancel,
    onRenameChange
  }
}