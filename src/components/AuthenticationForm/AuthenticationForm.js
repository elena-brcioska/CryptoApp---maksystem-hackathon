import React, { useState } from "react";
import styles from "./AuthenticationForm.module.css";
import { Box, Paper } from "@mui/material";
import { Form, Link, useSearchParams } from "react-router-dom";
import { useForm } from "../../hooks/form-hook";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MATCH,
  validate,
} from "../../util/validators";
import Input from "./Input";

const AuthenticationForm = () => {
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";

  const [formState, inputHandler, setFormData] = useForm(
    {
      username: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
      confirmPassword: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const [passwordMatch, setPasswordMatch] = useState(true);

  const handleConfirmPasswordChange = (event) => {
    const confirmPasswordValue = event.target.value;
    const match = validate(confirmPasswordValue, [
      VALIDATOR_MATCH(formState.inputs.password.value),
    ]);
    setPasswordMatch(match);
  };

  return (
    <Box
      sx={{ height: "85vh", display: "flex", alignItems: "center" }}
      className={styles.container}
    >
      <Paper
        className={styles["form-container"]}
        sx={{ borderRadius: "16px" }}
        elevation={10}
      >
        <div className="media-wrapper">
          <h1>{isLogin ? "Log in" : "Register for an account"}</h1>

          <Form action="/access" method="post" className={styles.form}>
          {!isLogin && (<Input
              name="username"
              id="username"
              element="input"
              type="text"
              label="Username"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a username"
              onInput={inputHandler}
            />)}

              <Input
                name="email"
                id="email"
                element="input"
                type="email"
                label="Email"
                validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
                errorText="Please enter a valid email"
                onInput={inputHandler}
              />

            <Input
              name="password"
              id="password"
              element="input"
              type="password"
              label="Password"
              validators={[
                VALIDATOR_REQUIRE(),
                VALIDATOR_MINLENGTH(6),
                VALIDATOR_MAXLENGTH(12),
              ]}
              errorText="Please enter a password that's between 6-12 characters"
              onInput={inputHandler}
            />

            {!isLogin && (
              <Input
                name="confirmPassword"
                id="confirmPassword"
                element="input"
                type="password"
                label="Confirm Password"
                validators={[
                  VALIDATOR_REQUIRE(),
                  VALIDATOR_MINLENGTH(6),
                  VALIDATOR_MAXLENGTH(12),
                  VALIDATOR_MATCH(formState.inputs.password.value),
                ]}
                errorText={"Passwords do not match"}
                onInput={inputHandler}
                onChange={handleConfirmPasswordChange}
              />
            )}

            <div className={styles.actions}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Box>
                  <span>Already have an account? </span>

                  {isLogin ? (
                    <Link
                      to="/access"
                      className={`${styles["action-btn"]} ${styles["link-btn"]}`}
                    >
                      Register
                    </Link>
                  ) : (
                    <Link
                      to="?mode=login"
                      className={`${styles["action-btn"]} ${styles["link-btn"]}`}
                    >
                      Login
                    </Link>
                  )}
                </Box>

                {!isLogin && (
                  <button
                    type="submit"
                    name="save"
                    className={styles["btn"]}
                    disabled={!formState.isValid}
                  >
                    Signup
                  </button>
                )}

                {isLogin && (
                  <button
                    name="save"
                    type="submit"
                    className={styles["btn"]}
                  >
                    Login
                  </button>
                )}
              </Box>
            </div>
          </Form>
        </div>
      </Paper>
    </Box>
  );
};

export default AuthenticationForm;
