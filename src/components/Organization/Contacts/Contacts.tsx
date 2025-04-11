import React from "react";
import { observer } from "mobx-react-lite";
import { KeyValueBlock } from "@/components/KeyValueBlock/KeyValueBlock";
import { ButtonsWithTitle } from "@/components/ButtonsWithTitle/ButtonsWithTitle";
import { Block } from "@/components/Block/Block";
import { useContacts } from "./useContacts";

export interface Contacts {}
export const Contacts: React.FC<Contacts> = observer(() => {

  const {state, organization, editing, onSaveClick, setEditing, onXClick, onChange} = useContacts();

  return organization && <Block>
    <ButtonsWithTitle
      title="Contacts"
      editingMode={editing}
      onSaveClick={onSaveClick}
      onEditClick={() => setEditing(true)}
      onXClick={onXClick} />
    <div className="contacts">
      <KeyValueBlock prop="Responsible person" name="person" value={state.person} editing={editing} onInputChange={onChange} />
      <KeyValueBlock prop="Phone number" name="phone" value={state.phone} editing={editing} onInputChange={onChange} />
      <KeyValueBlock prop="E-mail" name="email" value={state.email} editing={editing} onInputChange={onChange} />
    </div>
  </Block>
});