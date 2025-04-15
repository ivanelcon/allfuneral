import React from "react";
import dayjs from "dayjs";
import { useParams } from "react-router";
import { Store } from "@/app/store/Store";
import { API } from "@/app/api";
import { enqueueSnackbar } from "notistack";
import { useIMask } from "react-imask";
import type { DatePickerProps } from 'antd';

export const useDetails = () => {
  const params = useParams();
  const id = String(params.id);
  const organization = Store.Organization.organizations[id];
  const originalDate = organization?.contract?.issue_date || "";
  const date = dayjs(originalDate?.split("T")[0], "YYYY/MM/DD").format("MM.DD.YYYY");
  const businessEntity = organization?.businessEntity || "";
  const no = organization?.contract?.no || "";
  const prepareType = (type: string[]) => type.map(t => t.split("_").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" "));
  const type = prepareType(organization?.type || []);
  const types = prepareType(organization?.types || []);
  const [editing, setEditing] = React.useState<boolean>(false);
  const [state, setState] = React.useState({date, businessEntity, type});

  const {
    ref: maskRef,
    value: noValue,
    unmaskedValue: unmaskedNoValue,
    typedValue: typedNoValue
  } = useIMask({mask: "0000/0-00"}, {onAccept: () => {}, defaultTypedValue: no});

  const onSaveClick = async () => {
    const type = state.type.map(type => type.split(" ").map(w => w.charAt(0).toLowerCase() + w.slice(1)).join("_"));
    const date = dayjs(state.date as string, "MM.DD.YYYY").format('YYYY-MM-DDTHH:mm:ss');
    if (false === /^\d{4}\/\d\-\d{2}$/.test(noValue)) return enqueueSnackbar("Incorrect agreement number", {variant: "error"});
    try {
      const update = {type, businessEntity: state.businessEntity, contract: {no: noValue, issue_date: date}};
      const response = await API.Organization.update(Number(id), update);
      if ("error" in response) return enqueueSnackbar(response.error, {variant: "error"});
      Store.Organization.update(id, update);
      enqueueSnackbar("Company details updated", {variant: "success"});
      setEditing(false);
    }
    catch(error) {
      enqueueSnackbar("Cannot update company details", {variant: "error"});
    }
  }
  const onXClick = () => {
    setState({date, businessEntity, type});
    setEditing(false);
  }
  const onDateChange: DatePickerProps["onChange"] = (_, date) => setState(state => ({...state, date: date as string }));
  const onBusinessEntityChange = ([selected]: string[]) => setState(state => ({...state, businessEntity: selected }));
  const onCompanyTypeChange = (selected: string[]) => setState(state => ({...state, type: selected }));

  return {
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
    no,
    noValue,
    unmaskedNoValue,
    typedNoValue
  }
}