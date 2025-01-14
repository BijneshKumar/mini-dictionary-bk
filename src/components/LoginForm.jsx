
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });


  const handleSubmit = (values) => {
    localStorage.setItem("userData", JSON.stringify(values));

    navigate("/dashboard");
  };

  return (
    <div className="bg-[url('./assets/background-img.jpg')] bg-cover bg-center flex justify-center  items-center h-screen bg-gray-100 sm:justify-start sm:pl-24 " >
      <div className="bg-transparent p-6 rounded shadow-md w-96">
        <h1 className="text-3xl font-bold mb-4 text-white">Login</h1>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label className="block text-white">Email</label>
                <Field
                  type="email"
                  name="email"
                  className="w-full px-3 py-2 border rounded bg-transparent text-white"
                  placeholder="Enter your email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="mb-4">
                <label className="block text-white">Password</label>
                <Field
                  type="password"
                  name="password"
                  className="w-full px-3 py-2 border rounded bg-transparent text-white"
                  placeholder="Enter your password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-400 text-white py-2 rounded hover:bg-blue-500"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Log In"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginForm;
