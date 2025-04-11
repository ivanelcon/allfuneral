import "./MainLayout.style.scss";
import { Menu } from '@/components/Menu/Menu';
import { Sidebar } from '@/components/Sidebar/Sidebar';
import { Dialogbox } from "@/shared/ui/Dialogbox/Dialogbox";
import { Outlet } from 'react-router';
import { Fragment } from "react/jsx-runtime";

const MainLayout = () => {
  return (
    <Fragment>
      <div className="main-layout">
        <div className="main-layout__side">
          <Menu />
          <Sidebar />
        </div>
        <div className="main-layout__content">
          <Outlet />
        </div>
      </div>
      <Dialogbox />
    </Fragment>
  )
}

export default MainLayout;