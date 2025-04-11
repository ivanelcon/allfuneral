import React from "react";
import { useParams } from "react-router";
import { Store } from "@/app/store/Store";
import { API } from "@/app/api";
import { enqueueSnackbar } from "notistack";

export const useContacts = () => {
  const params = useParams();
  const id = String(params.id);
  const organization = Store.Organization.organizations[id];
  const contactId = organization?.contactId;
  const {firstname, lastname, phone, email} = organization?.contacts || {firstname: "", lastname: "", phone: "", email: ""};
  const person = `${firstname} ${lastname}`;
  const [state, setState] = React.useState({phone, email, person});
  const [editing, setEditing] = React.useState(false);

  const onChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const {name, value} = event.currentTarget;
    setState(state => ({...state, [name]: value}));
  }

  const onSaveClick = async () => {
    try {
      const person = state.person.trim();
      if (!/^[\w\u0430-\u044f]+\s[\w\u0430-\u044f]+$/i.test(person)) return enqueueSnackbar("Specify only firstname and lastname", {variant: "error"});
      const firstname = person.split(" ")[0];
      const lastname = person.split(" ")[1];
      const phone = state.phone.trim();
      const email = state.email.trim();
      const update = {firstname, lastname, phone, email};
      const response = await API.Contacts.update(Number(contactId), update);
      if ("error" in response) return enqueueSnackbar(response.error, {variant: "error"});
      Store.Organization.contactsUpdate(id, update);
      enqueueSnackbar("Contacts updated", {variant: "success"});
      setEditing(false);
      setState(state => ({...state, phone, email, person}));
    }
    catch(error) {
      enqueueSnackbar("Cannot update contacts", {variant: "error"});
    }
  }
  const onXClick = () => {
    setState({phone, email, person});
    setEditing(false);
  }

  return {
    state,
    organization,
    editing,
    onSaveClick,
    setEditing,
    onXClick,
    onChange
  }
}