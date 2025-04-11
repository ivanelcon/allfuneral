import "./KeyValueBlock.style.scss";
import dayjs from "dayjs";
import { Input } from "@/shared/ui/Input/Input";
import { DatePicker, DatePickerProps } from "antd";
import { Fragment } from "react/jsx-runtime";
import { Selectbox } from "@/shared/ui/Selectbox/Selectbox";

export enum Type {SELECT, MULTISELECT, DATE, INPUT, SLASH}
export interface KeyValueBlock {
  type?: Type;
  prop: string;
  name?: string;
  value: string | [string, string] | string[];
  values?: string[];
  editing: boolean;
  onDateChange?: DatePickerProps["onChange"];
  onInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectChange?: (selected: string[]) => void;
}
export const KeyValueBlock: React.FC<KeyValueBlock> = ({
  type = Type.INPUT,
  prop,
  name,
  value,
  values,
  editing,
  onDateChange,
  onInputChange,
  onSelectChange
}) => {
  let valueBlock = undefined;
  if (editing) {
    if (type === Type.INPUT) valueBlock = <Input name={name || prop} value={value as string} onChange={onInputChange} />
    if (type === Type.DATE) {
      valueBlock = <DatePicker 
        className="datepicker"
        format="MM.DD.YYYY"
        defaultValue={dayjs(value as string, "MM.DD.YYYY")}
        onChange={onDateChange} />
    }
    if (type === Type.SELECT) {
      valueBlock = <Selectbox options={values || []} optionsSelected={value} onChange={onSelectChange} />;
    }
    if (type === Type.MULTISELECT) {
      valueBlock = <Selectbox options={values || []} optionsSelected={value} multiple={true} onChange={onSelectChange} />;
    }
  }
  else {
    if (type == Type.SLASH) {
      valueBlock = <Fragment>{value[0]}<span className="keyvalueblock__slash">/</span>{value[1]}</Fragment>;
    }
    else valueBlock = Array.isArray(value) ? value.join(", ") : value;
  }

  return <div className="keyvalueblock">
    <div className="keyvalueblock__prop">{prop}:</div>
    <div className="keyvalueblock__value">{valueBlock}</div>
  </div>
}