import { useEffect } from "react";
import { Check2Square, EnvelopeCheck } from "react-bootstrap-icons";

export default function RegisterConfirmPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  },[])
  return (
    <div className="register-confirmed">
      <div className="purple-header confirmed">
          <div className="congrats"></div>
          <div className='content'>
            <div className='title'>
              <Check2Square />
              Felicitaciones!</div>
            <div className='subtitle'>Su cuenta fue creada correctamente!</div>
          </div>
          <div className="congrats-right"></div>
        </div>
        <div className="cart-container">
          <div className="head-confirmation">
            <div className="message success">
              <EnvelopeCheck />
              Recibirá un e-mail cuando sea validada. Revise su correo no deseado.<br /> ¡Muchas gracias!
            </div>
          </div>
        </div>
    </div>
  );
}
