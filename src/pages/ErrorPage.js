import { useRouteError } from "react-router-dom";
//import { Container } from "@material-ui/core";
import Header from "../components/Header";
import { Container } from "react-bootstrap";

export default function ErrorPage({errorMessage}) {
  const error = useRouteError();
  return (
    <>
      <Container>
        <div id="error-page" className="error-page">
          <h1>Oops!</h1>
          <p>Algo salió mal!</p>
          {errorMessage ? 
            <p>{errorMessage}</p>
            : error ? 
            <p>
              <i>{error.statusText || error.message}</i>
            </p>
            : null
          }
        </div>
      </Container>
    </>
  );
}
