import React from "react";
import { observer } from "mobx-react-lite";
import { KeyValueBlock } from "@/components/KeyValueBlock/KeyValueBlock";
import { ButtonsWithTitle } from "@/components/ButtonsWithTitle/ButtonsWithTitle";
import { Block } from "@/components/Block/Block";
import { useContacts } from "./useContacts";
import { Input } from "@/shared/ui/Input/Input";

export interface Contacts {}
export const Contacts: React.FC<Contacts> = observer(() => {

  const {state, organization, editing, onSaveClick, setEditing, onXClick, onChange, formattedPhone, maskRef} = useContacts();

  return organization && <Block>
    <ButtonsWithTitle
      title="Contacts"
      editingMode={editing}
      onSaveClick={onSaveClick}
      onEditClick={() => setEditing(true)}
      onXClick={onXClick} />
    <div className="contacts">
      <KeyValueBlock prop="Responsible person">
        {editing ? <Input name="person" value={state.person} onChange={onChange} /> : state.person}
      </KeyValueBlock>
      <KeyValueBlock prop="Phone number">
        {editing ? <Input name="phone" ref={maskRef as any} /> : formattedPhone}
      </KeyValueBlock>
      <KeyValueBlock prop="E-mail">
        {editing ? <Input name="email" value={state.email} onChange={onChange} /> : state.email}
      </KeyValueBlock>
    </div>
  </Block>
});