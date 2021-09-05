import React from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import Field from "../uis/Field";

const ForgetSchema = Yup.object().shape({
  username: Yup.string().min(3).max(18).required(),
});

function ForgetForm({
  status,
  changeToForget,
  changeToRegister,
  STATUS,
  handleOnForget,
}) {
  return (
    <Formik
      initialValues={{
        username: "",
      }}
      validationSchema={ForgetSchema}
      onSubmit={handleOnForget}
    >
      {({ errors, touched }) => (
        <Form>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <Field
                name="username"
                placeholder="Username"
                id="username"
                type="text"
                autoComplete="true"
              />
              {errors.username && touched.username ? (
                <div className="text-red-500 text-sm py-1">
                  {errors.username}
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

export default ForgetForm;
