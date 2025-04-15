import MainLayout from "@/layouts/MainLayout";
import { BrowserRouter, Route, Routes } from "react-router";
import { Organization } from "@/components/Organization/Organization";
import { Clients } from "@/pages/Clients";
import { Contractors } from "@/pages/Contractors";
import { Organizations } from "@/pages/Organizations";
import { NotFound } from "@/pages/NotFound";
import { Search } from "@/pages/Search";
import { Settings } from "@/pages/Settings";
import { Signout } from "@/pages/Signout";

export const routes = <BrowserRouter>
  <Routes>
    <Route element={<MainLayout />}>
      <Route index element={<Organizations />} />
      <Route path="organization/:id" element={<Organization />} />
      <Route path="organizations" element={<Organizations />} />
      <Route path="allfuneral" element={<Organizations />} />
      <Route path="contractors" element={<Contractors />} />
      <Route path="clients" element={<Clients />} />
      <Route path="search" element={<Search />} />
      <Route path="settings" element={<Settings />} />
      <Route path="signout" element={<Signout />} />
    </Route>
    <Route path="*" element={<NotFound />} />
  </Routes>
</BrowserRouter>;