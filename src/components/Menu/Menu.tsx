import "./Menu.style.scss";
import { useLocation, useNavigate } from "react-router";
import AppIcon from "@/assets/Vector.svg?react";
import CompanyIcon from "@/assets/Company.svg?react";
import SearchIcon from "@/assets/Search.svg?react";
import SettingsIcon from "@/assets/Settings.svg?react";
import SignOutIcon from "@/assets/SignOut.svg?react";

export interface Menu {}
export const Menu: React.FC<Menu> = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const resolveClass = (arr: string[]) => {
    return arr.some((loc) => location.pathname.startsWith(loc)) ? "menu__item menu__item--current" : "menu__item";
  }
  return <div className="menu">
    <div className="menu__top">
      <div className="menu__item menu__item--logotype">
        <AppIcon width={36} height={36} />
      </div>
      <div className={resolveClass(["/organization", "/organizations", "/contractors", "/clients"])} onClick={() => navigate("/organizations")}>
        <CompanyIcon stroke="white" width={20} height={20} />
      </div>
      <div className={resolveClass(["/search"])} onClick={() => navigate("/search")}>
        <SearchIcon width={20} height={20} />
      </div>
    </div>
    <div className="menu__bottom">
      <div className={resolveClass(["/settings"])} onClick={() => navigate("/settings")}>
        <SettingsIcon width={20} height={20} />
      </div>
      <div className={resolveClass(["/signout"])} onClick={() => navigate("/signout")}>
        <SignOutIcon width={20} height={20} />
      </div>
    </div>
  </div>
}