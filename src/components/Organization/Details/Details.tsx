import "./Details.style.scss";
import React, { Fragment } from "react";
import { observer } from "mobx-react-lite";
import { KeyValueBlock } from "@/components/KeyValueBlock/KeyValueBlock";
import { Block } from "@/components/Block/Block";
import { ButtonsWithTitle } from "@/components/ButtonsWithTitle/ButtonsWithTitle";
import { useDetails } from "./useDetails";
import { DatePicker } from "antd";
import { Selectbox } from "@/shared/ui/Selectbox/Selectbox";
import { Input } from "@/shared/ui/Input/Input";
import dayjs from "dayjs";

export interface Details {}
export const Details: React.FC<Details> = observer(() => {
  
  const {
    state,
    organization,
    businessEntity,
    types,
    date,
    editing,
    setEditing,
    onSaveClick,
    onXClick,
    onDateChange,
    onBusinessEntityChange,
    onCompanyTypeChange,
    maskRef,
    no
  } = useDetails();

  const agreementBlock = editing ?
    <div className="company-details__container">
      <KeyValueBlock prop="Agreement number">
        <Input name="no" ref={maskRef as any} />
      </KeyValueBlock>
      <KeyValueBlock prop="Date">
        <DatePicker className="datepicker" format="MM.DD.YYYY" defaultValue={dayjs(state.date, "MM.DD.YYYY")} onChange={onDateChange} />
      </KeyValueBlock>
    </div> :
    <KeyValueBlock prop="Agreement">
      <Fragment>{no}<span className="company-details__slash">/</span>{date}</Fragment>
    </KeyValueBlock>

  return organization && <Block>
    <ButtonsWithTitle 
      title="Company Details"
      editingMode={editing}
      onSaveClick={onSaveClick}
      onEditClick={() => setEditing(true)}
      onXClick={onXClick} />
    <div className="company-details">
      {agreementBlock}
      <KeyValueBlock prop="Business entity">
        {editing ? <Selectbox options={[businessEntity]} optionsSelected={state.businessEntity} onChange={onBusinessEntityChange} /> : businessEntity}
      </KeyValueBlock>
      <KeyValueBlock prop="Company type">
        {editing ? <Selectbox options={types} optionsSelected={state.type} onChange={onCompanyTypeChange} multiple={true} /> : state.type.join(", ")}
      </KeyValueBlock>
    </div>
  </Block>
})