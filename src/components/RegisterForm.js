import React from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import Field from "../uis/Field";

const RegisterSchema = Yup.object().shape({
  username: Yup.string().min(3).max(18).required(),
  lastName: Yup.string().min(3).max(10).required(),
  firstName: Yup.string().min(3).max(10).required(),
  password: Yup.string().min(6).max(20).required(),
  rePassword: Yup.string()
    .oneOf([Yup.ref("password"), null])
    .required(),
});

function RegisterForm({
  status,
  changeToForget,
  changeToRegister,
  STATUS,
  handleOnRegister,
}) {
  return (
    <Formik
      initialValues={{
        username: "",
        lastName: "",
        firstName: "",
        password: "",
        rePassword: "",
      }}
      validationSchema={RegisterSchema}
      onSubmit={handleOnRegister}
    >
      {({ errors, touched }) => (
        <Form>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <Field
                id="username"
                name="username"
                type="text"
                required
                placeholder="Username"
              />
              {errors.username && touched.username ? (
                <div className="text-red-500 text-sm py-1">
                  {errors.username}
                </div>
              ) : null}
            </div>
            <div className="py-1">
              <Field
                id="firstName"
                name="firstName"
                type="text"
                required
                placeholder="First Name"
              />
              {errors.firstName && touched.firstName ? (
                <div className="text-red-500 text-sm py-1">
                  {errors.firstName}
                </div>
              ) : null}
            </div>
            <div className="py-1">
              <Field
                id="lastName"
                name="lastName"
                type="text"
                required
                placeholder="Last Name"
              />
              {errors.lastName && touched.lastName ? (
                <div className="text-red-500 text-sm py-1">
                  {errors.lastName}
                </div>
              ) : null}
            </div>
            <div className="py-1">
              <Field
                id="password"
                name="password"
                type="password"
                required
                placeholder="Password"
              />
              {errors.password && touched.password ? (
                <div className="text-red-500 text-sm py-1">
                  {errors.password}
                </div>
              ) : null}
            </div>
            <div className="py-1">
              <Field
                id="rePassword"
                name="rePassword"
                type="password"
                required
                placeholder="Retype Password"
              />
              {errors.rePassword && touched.rePassword ? (
                <div className="text-red-500 text-sm py-1">
                  {errors.rePassword}
                </div>
              ) : null}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div></div>
            <div className="text-sm my-5">
              {status !== STATUS.FORGOT ? (
                <span
                  className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer"
                  onClick={changeToForget}
                >
                  Forgot your password?
                </span>
              ) : (
                <span
                  className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer"
                  onClick={changeToRegister}
                >
                  Register a new account
                </span>
              )}
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              {status === STATUS.LOGIN && "Login"}
              {status === STATUS.REGISTER && "Register"}
              {status === STATUS.FORGOT && "Reset Password"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default RegisterForm;
