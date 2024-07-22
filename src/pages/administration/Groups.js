import React from "react";

import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";
import Cookies from "universal-cookie";

export default function Users() {
  const { t } = useTranslation("groups");
  const cookie = new Cookies();
  if (!cookie.get("isAdmin")) {
    window.location.href = "#/";
  }

  return (
    <div>
      <h2>{t("groupAdminTitle")}</h2>
      <Outlet />
    </div>
  );
}
