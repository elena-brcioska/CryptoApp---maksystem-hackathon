import React from "react";
import AuthenticationForm from "../../components/AuthenticationForm/AuthenticationForm";
import { json, redirect } from "react-router";
import { toast } from 'react-toastify';

const Auth = () => {

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
      })
  } else if (mode === "login") {
   const registeredUser = JSON.parse(localStorage.getItem("registeredUser"));

   return request.formData().then((formData) => {
    const authData = {
      username: formData.get("username"),
      password: formData.get("password"),
    };

    console.log(registeredUser);
    console.log(authData);

    if (authData.username === registeredUser.username && authData.password === registeredUser.password) {
        toast.success("Login successful!");
        localStorage.setItem("loggedInUser", JSON.stringify(authData.username));
        return redirect("/");


    } else {
        toast.error("User does not exist!");
        return redirect("?mode=login");
    }

  });
  }

};

export default Auth;
