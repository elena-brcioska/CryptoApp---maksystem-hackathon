import React from "react";
import styles from "./AuthenticationForm.module.css";
import { Box, Paper, TextField } from "@mui/material";
import { Form, Link, useSearchParams } from "react-router-dom";

const AuthenticationForm = () => {
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";

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

          <Form action="/" method="post" className={styles.form}>
            <TextField
              sx={{ width: "100%", margin: "8px 0" }}
              id="username"
              type="text"
              name="username"
              variant="filled"
              label="Username"
            />

            {!isLogin && (
              <TextField
                sx={{ width: "100%", margin: "8px 0" }}
                id="email"
                type="email"
                name="email"
                variant="filled"
                label="Email"
              />
            )}

            <TextField
              sx={{ width: "100%", margin: "8px 0" }}
              id="password"
              type="password"
              name="password"
              label="Password"
              variant="filled"
            />
            {!isLogin && (
              <TextField
                sx={{ width: "100%", margin: "8px 0" }}
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                label="Confirm Password"
                variant="filled"
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

                  {
                  isLogin ? 
                  (<Link to="/"
                    className={`${styles["action-btn"]} ${styles["link-btn"]}`}
                  >Register</Link>) : (<Link to="?mode=login" className={`${styles["action-btn"]} ${styles["link-btn"]}`}
                  >
                   Login
                  </Link>)
                  }

                </Box>

                <button name="save" className={styles["btn"]}>
                  Procceed
                </button>
              </Box>
            </div>
          </Form>
        </div>
      </Paper>
    </Box>
  );
};



export default AuthenticationForm;
