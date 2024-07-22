import React from "react";

import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";
import Cookies from "universal-cookie";

export default function Graphics() {
  const { t } = useTranslation("graphics");
  const cookie = new Cookies();
  if (!cookie.get("isAdmin")) {
    window.location.href = "#/";
  }

  return (
    <div>
      <h2>{t("graphicAdminTitle")}</h2>
      <Outlet />
    </div>
  );
}
