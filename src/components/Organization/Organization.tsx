import "./Organization.style.scss";
import React from "react";
import { useParams } from "react-router";
import { Details } from "./Details/Details";
import { Contacts } from "./Contacts/Contacts";
import { Actions } from "./Actions/Actions";
import { Photos } from "./Photos/Photos";
import { useSnackbar } from "notistack";
import { useOrganization } from "./useOrganization";

export interface Organization {}
export const Organization: React.FC<Organization> = () => {
  const params = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const id = Number(params.id);
  const {fetching, error} = useOrganization(id);
  
  if (fetching) {
    return <div className="organization__fetch">Loading...</div>
  }
  if (!fetching && error) {
    const err = typeof error === "object" ? error.message : error;
    enqueueSnackbar(err, {variant: "error"});
    return <div className="organization__error">{err} 😪</div>
  }

  return <div className="organization">
    <Actions />
    <div className="organization__blocklist">
      <Details />
      <Contacts />
      <Photos />
    </div>
  </div>
}