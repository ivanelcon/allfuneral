import React from "react";
import { useParams } from "react-router";
import { Store } from "@/app/store/Store";
import { API } from "@/app/api";
import { enqueueSnackbar } from "notistack";
import { useIMask } from "react-imask";

export const useContacts = () => {
  const params = useParams();
  const id = String(params.id);
  const organization = Store.Organization.organizations[id];
  const contactId = organization?.contactId;
  const {firstname, lastname, phone, email} = organization?.contacts || {firstname: "", lastname: "", phone: "", email: ""};
  const person = `${firstname} ${lastname}`;
  const formattedPhone = `+${phone[0]} ${phone.slice(1, 4)} ${phone.slice(4, 7)} ${phone.slice(7, 11)}`;
  const [state, setState] = React.useState({email, person});
  const [editing, setEditing] = React.useState(false);

  const {
    ref: maskRef,
    value: phoneValue,
    unmaskedValue: unmaskedPhoneValue
  } = useIMask({mask: "+0 000 000 0000"}, {onAccept: () => {}, defaultValue: phone});
  
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
      const phone = unmaskedPhoneValue.trim();
      const email = state.email.trim();
      const update = {firstname, lastname, phone, email};
      const response = await API.Contacts.update(Number(contactId), update);
      if ("error" in response) return enqueueSnackbar(response.error, {variant: "error"});
      Store.Organization.contactsUpdate(id, update);
      enqueueSnackbar("Contacts updated", {variant: "success"});
      setEditing(false);
      setState(state => ({...state, email, person}));
    }
    catch(error) {
      enqueueSnackbar("Cannot update contacts", {variant: "error"});
    }
  }
  const onXClick = () => {
    setState({email, person});
    setEditing(false);
  }

  return {
    state,
    organization,
    editing,
    onSaveClick,
    setEditing,
    onXClick,
    onChange,
    phone,
    formattedPhone,
    maskRef,
    phoneValue,
    unmaskedPhoneValue
  }
}