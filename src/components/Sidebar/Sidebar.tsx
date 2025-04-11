import "./Sidebar.style.scss";
import { useLocation, useNavigate } from "react-router";
import { Button } from "@/shared/ui/Button/Button";
import CompanyIcon from "@/assets/Company.svg?react";
import ContractorIcon from "@/assets/Contractor.svg?react";
import AccountIcon from "@/assets/Account.svg?react";

export interface Sidebar {}
export const Sidebar: React.FC<Sidebar> = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const resolveButtonFormat = (arr: string[]) => {
    return arr.some((loc) => location.pathname.startsWith(loc)) ? "filled" : "outline";
  }
  return <div className="sidebar">
    <div className="sidebar__top">
      <div className="sidebar__title">Oak Tree Cemetery</div>
      <div className="sidebar__subtitle">Process Manager</div>
    </div>
    <div className="sidebar__wrapper">
      <div className="sidebar__menu">
        <Button onClick={() => navigate("organizations")} icon={<CompanyIcon stroke="#3B3B3B" width={16} height={16} />} title="Organizations" format={resolveButtonFormat(["/organization", "/organizations"])} />
        <Button onClick={() => navigate("contractors")} icon={<ContractorIcon stroke="#3B3B3B" width={16} height={16} />} title="Contractors" format={resolveButtonFormat(["/contractors"])} />
        <Button onClick={() => navigate("clients")} icon={<AccountIcon stroke="#3B3B3B" width={16} height={16} />} title="Clients" format={resolveButtonFormat(["/clients"])} />
      </div>
      <div className="sidebar__bottom">
        All Funeral Services © 2015-2025
      </div>
    </div>
  </div>
}