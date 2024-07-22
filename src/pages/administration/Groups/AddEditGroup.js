import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../../components/Loader";
import { useFetchById } from "../../../services/useFetch";
import AEGroupComponent from "./AddEditGroupComponent";

export default function AddEditGroup() {
  const { id } = useParams();
  const baseURL = process.env.REACT_APP_WEB_SERVICES + "groupById.php";
  const { data, loading, error } = useFetchById(baseURL, id);

  return (
    <div className="App">
      {loading && <Loader />}
      {data && (
        <AEGroupComponent
          users={data.users}
          graphics={data.graphics}
          id={id}
          name={data.name}
        />
      )}
    </div>
  );
}
