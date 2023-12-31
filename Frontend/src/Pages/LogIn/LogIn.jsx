import { useState, useContext } from "react";
//import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CustomerForm from "../../Components/CustomerForm/CustomerForm.jsx";
import { UserContext } from "../../main";
import "./LogIn.css";

const loginUser = (user) => {
  console.log(user);
  const url = process.env.VITE_APP_MY_URL;

  return fetch(`${url}/Auth/Login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((res) => {
    if (!res.ok) {
      return res.json().then((data) => {
        throw new Error(data["Bad credentials"][0] || "Login failed");
        //if the object contains "Bad credentials" we get that error message, 
        //otherwise generally the message "Login failed"
      });
    }
    return res.json(); //if the response is "ok"
  });
};

const LogIn = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const context = useContext(UserContext); //connect to UserContext

  const [errorMessage, setErrorMessage] = useState("");

  const handleLogIn = (user) => {
    setLoading(true);
    loginUser(user)
      .then((data) => {
        setLoading(false);
        context.setUser(data); //set the user in the context
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        console.error("Login error:", error.message);
        setErrorMessage(error.message);
      });
  };

  /*
  useEffect(() => {
    console.log("Error message saved in the state:", errorMessage);
  }, [errorMessage]);
  */

  if (context.user) {
    return <p>You are already logged in.</p>;
  }

  return (
    <CustomerForm
      onCancel={() => navigate("/")}
      onSave={handleLogIn}
      disabled={loading}
      isRegister={false}
      errorMessage={errorMessage}
    />
  );
};

export default LogIn;
