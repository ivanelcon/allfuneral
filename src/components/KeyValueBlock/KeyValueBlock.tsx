import "./KeyValueBlock.style.scss";

export interface KeyValueBlock {
  prop: string;
  children?: React.ReactNode;
}
export const KeyValueBlock: React.FC<KeyValueBlock> = ({
  prop,
  children
}) => {
  return <div className="keyvalueblock">
    <div className="keyvalueblock__prop">{prop}:</div>
    <div className="keyvalueblock__value">{children}</div>
  </div>
}