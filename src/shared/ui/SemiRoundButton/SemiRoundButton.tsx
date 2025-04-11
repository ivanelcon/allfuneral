import "./SemiRoundButton.style.scss";

export interface SemiRoundButton {
  icon: React.ReactElement;
}
export const SemiRoundButton: React.FC<SemiRoundButton> = ({ icon }) => {
  return <div className="semi-round-button">{icon}</div>
}