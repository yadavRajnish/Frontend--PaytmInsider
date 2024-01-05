import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

function SignUpPage() {
  
  const initialValues = {
    name: "",
    email: "",
    password: "",
    contact: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Full Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
    contact: Yup.string()
      .matches(/^[0-9]{10}$/, "Invalid phone number")
      .required("Phone is required"),
  });

  const [isSignupSuccess, setIsSignupSuccess] = useState(false);
  const [signupError, setSignupError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await fetch("https://paytm-insider-backend.onrender.com/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        setIsSignupSuccess(true);

        localStorage.setItem("user", JSON.stringify(values));

        resetForm();
        navigate("/login");
      } else {
        const data = await response.json();
        if (data.message === "User already exists") {
          setSignupError("User with this email already exists.");
        } else {
          console.error("Failed to send form data.");
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="pt-24 flex justify-center mb-16">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <div className="d-flex justify-center text-center">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Avatar sx={{ m: 2, bgcolor: "secondary.main" }}>
                    <LockOutlinedIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                    Sign up
                  </Typography>
                </div>
              </div>

              <div>
                <Field
                  type="text"
                  label="Full Name"
                  name="name"
                  variant="outlined"
                  as={TextField}
                  style={{
                    padding: "0px !important",
                    margin: "0px !important",
                  }}
                  sx={{
                    height: "64px",
                    width: "100%",
                    minWidth: "200px",
                    "@media (min-width: 600px)": {
                      width: "300px",
                    },
                    "@media (min-width: 960px)": {
                      width: "400px",
                    },
                  }}
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500"
                  style={{
                    padding: "0px !important",
                    margin: "0px !important",
                  }}
                />
              </div>

              <div>
                <Field
                  type="email"
                  label="Email Address"
                  name="email"
                  variant="outlined"
                  as={TextField}
                  sx={{
                    height: "64px",
                    width: "100%",
                    minWidth: "200px",
                    "@media (min-width: 600px)": {
                      width: "300px",
                    },
                    "@media (min-width: 960px)": {
                      width: "400px",
                    },
                  }}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500"
                />
                {signupError && (
                  <div className="text-red-500">{signupError}</div>
                )}
              </div>
              <div>
                <Field
                  type="password"
                  label="Password"
                  name="password"
                  variant="outlined"
                  as={TextField}
                  sx={{
                    height: "64px",
                    width: "100%",
                    minWidth: "200px",
                    "@media (min-width: 600px)": {
                      width: "300px",
                    },
                    "@media (min-width: 960px)": {
                      width: "400px",
                    },
                  }}
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div>
                <Field
                  type="text"
                  label="Phone"
                  name="contact"
                  variant="outlined"
                  as={TextField}
                  inputProps={{ pattern: "[0-9]*" }}
                  sx={{
                    height: "64px",
                    width: "100%",
                    minWidth: "200px",
                    "@media (min-width: 600px)": {
                      width: "300px",
                    },
                    "@media (min-width: 960px)": {
                      width: "400px",
                    },
                  }}
                />
                <ErrorMessage
                  name="contact"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                sx={{ width: "auto" }}
              >
                Sign Up
              </Button>
              {isSignupSuccess && (
                <div className="text-green-500">Successfully created an account</div>
              )}
            </Form>
          )}
        </Formik>
      </div>
      <Footer />
    </div>
  );
}

export default SignUpPage;
