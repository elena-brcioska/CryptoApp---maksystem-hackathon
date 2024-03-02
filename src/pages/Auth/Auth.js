import React, { useEffect } from "react";
import AuthenticationForm from "../../components/AuthenticationForm/AuthenticationForm";
import { Navigate, json, redirect, useActionData } from "react-router";
import { toast } from "react-toastify";
import { useMyCoins } from "../../context/MyCoinsContext";

const Auth = () => {
  let user;
  try {
    user = JSON.parse(localStorage.getItem("loggedInUser"));
  } catch (error) {
    console.error("Error parsing JSON from localStorage:", error);
  }

  const { setLoggedInUser, loggedInUser } = useMyCoins();
  const data = useActionData();
  console.log(data, "DAATA");

  useEffect(() => {
    if (data) {
      const storedUserData = localStorage.getItem("registeredUser");
      if (storedUserData) {
        const { username } = JSON.parse(storedUserData);
        setLoggedInUser(username);
      }
    }
  }, [data, setLoggedInUser]);

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <AuthenticationForm />
    </div>
  );
};

export const action = ({ request }) => {
  const searchParams = new URL(window.location.href).searchParams;
  console.log(searchParams);
  const mode = searchParams.get("mode") || "signup";

  console.log(mode);

  if (mode !== "login" && mode !== "signup") {
    throw json({ message: "Unsupported mode!" }, { status: 422 });
  }

  if (mode === "signup") {
    return request.formData().then((formData) => {
      const authData = {
        email: formData.get("email"),
        username: formData.get("username"),
        password: formData.get("password"),
      };

      localStorage.setItem("registeredUser", JSON.stringify(authData));

      return redirect("?mode=login");
    });
  } else if (mode === "login") {
    const registeredUser = JSON.parse(localStorage.getItem("registeredUser"));

    return request.formData().then((formData) => {
      const authData = {
        email: formData.get("email"),
        password: formData.get("password"),
      };

      console.log(registeredUser);
      console.log(authData);

      if (
        authData.email === registeredUser.email &&
        authData.password === registeredUser.password
      ) {
        toast.success("Login successful!");
        localStorage.setItem("loggedInUser", JSON.stringify(registeredUser.username));
        return authData;
      } else {
        toast.error("User does not exist!");
        return redirect("?mode=login");
      }
    });
  }
};

export default Auth;
