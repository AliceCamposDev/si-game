
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import "./Login.css";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  function navigateToMenu(accessToken: string): void{
    navigate("/menu", { state: { accessToken } });
    }
  return (
    <div className="loginContainer">
      <h2>Entre com sua conta Robbyson!</h2>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          const token: string = credentialResponse.credential || "";
          api.post("PlayerToken/", { token }).then((res: { data: {accessToken: string}}) => {
            navigateToMenu(res.data.accessToken)
          });
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </div>
  );
}

export default Login;
