import { API } from "@/app/api";
import { Store } from "@/app/store/Store";
import React from "react";

interface UseOrganizationState {
  error: any;
  fetching: boolean;
}
export const useOrganization = (id: number) => {
  const organization = Store.Organization.organizations[id];
  const [state, setState] = React.useState<UseOrganizationState>({error: null, fetching: organization ? false : true});
  const fetchOrganization = async () => {
    try {
      const organization = await API.Organization.get(id);
      if ("error" in organization) return setState(state => ({...state, fetching: false, error: organization.error}));
      const contact = await API.Contacts.get(Number(organization.contactId));
      if ("error" in contact) return setState(state => ({...state, fetching: false, error: contact.error}));
      Store.Organization.save(String(id), {...organization, contacts: {...contact}});
      setState(state => ({...state, fetching: false}));
    }
    catch(error) {
      setState(state => ({...state, fetching: false, error}));
    }
  };
  React.useEffect(() => { !organization && fetchOrganization() }, [id]);
  return state;
}