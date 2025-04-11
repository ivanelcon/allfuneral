import "./Details.style.scss";
import React from "react";
import { observer } from "mobx-react-lite";
import { Type, KeyValueBlock } from "@/components/KeyValueBlock/KeyValueBlock";
import { Block } from "@/components/Block/Block";
import { ButtonsWithTitle } from "@/components/ButtonsWithTitle/ButtonsWithTitle";
import { useDetails } from "./useDetails";

export interface Details {}
export const Details: React.FC<Details> = observer(() => {
  
  const {state, organization, businessEntity, types, date, no, editing,
    setEditing,
    onSaveClick,
    onXClick,
    onNumberChange,
    onDateChange,
    onBusinessEntityChange,
    onCompanyTypeChange
  } = useDetails();

  const agreementBlock = editing ?
    <div className="company-details__container">
      <KeyValueBlock prop="Agreement number" value={state.no} editing={editing} onInputChange={onNumberChange} />
      <KeyValueBlock prop="Date" type={Type.DATE} value={state.date} editing={editing} onDateChange={onDateChange} />
    </div> :
    <KeyValueBlock type={Type.SLASH} prop="Agreement" value={[no, date]} editing={editing} />;

  return organization && <Block>
    <ButtonsWithTitle 
      title="Company Details"
      editingMode={editing}
      onSaveClick={onSaveClick}
      onEditClick={() => setEditing(true)}
      onXClick={onXClick} />
    <div className="company-details">
      {agreementBlock}
      <KeyValueBlock
        type={Type.SELECT}
        prop="Business entity"
        values={[businessEntity]}
        value={state.businessEntity}
        onSelectChange={onBusinessEntityChange}
        editing={editing} />
      <KeyValueBlock
        type={Type.MULTISELECT}
        prop="Company type"
        values={types}
        value={state.type}
        onSelectChange={onCompanyTypeChange}
        editing={editing} />
    </div>
  </Block>
})