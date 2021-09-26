import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import ForgetForm from "../components/ForgetForm";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import {
  loadingSelect,
  login,
  startLoading,
  stopLoading,
  userSelect,
} from "../reducers/userSlice";
import server from "../services/server";

const STATUS = { LOGIN: 0, REGISTER: 1, FORGOT: 2 };

function Login() {
  const [status, setStatus] = useState(STATUS.LOGIN);
  const [warning, setWarning] = useState(null);
  const loading = useSelector(loadingSelect);
  const dispatcher = useDispatch();
  const user = useSelector(userSelect);

  const changeToLogin = () => {
    setStatus(STATUS.LOGIN);
  };
  const changeToRegister = () => {
    setStatus(STATUS.REGISTER);
  };
  const changeToForget = () => {
    setStatus(STATUS.FORGOT);
  };
  const handleOnLogin = (value) => {
    dispatcher(startLoading());
    server()
      .post("/user/login/", value)
      .then((result) => {
        if (!result.data.success) {
          setWarning(result.data?.message);
        } else {
          dispatcher(login(result.data.load.token));
        }

        dispatcher(stopLoading());
      });
  };
  const handleOnRegister = (value) => {
    dispatcher(startLoading());
    server()
      .post("/user/register/", value)
      .then((result) => {
        if (!result.data.success) {
          setWarning(result.data?.message);
        } else {
          setStatus(STATUS.LOGIN);
        }

        dispatcher(stopLoading());
      });
  };
  const handleOnForget = (value) => {
    console.log(value);
  };
  return (
    <>
      {user && <Redirect to="/"></Redirect>}

      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              {status === STATUS.LOGIN && "Sign in to your account"}
              {status === STATUS.REGISTER && "Register a new account"}
              {status === STATUS.FORGOT &&
                "Recover your account in the fastest way"}
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or
              {status === STATUS.LOGIN && (
                <span
                  className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer"
                  onClick={changeToRegister}
                >
                  {" register new account"}
                </span>
              )}
              {(status === STATUS.REGISTER || status === STATUS.FORGOT) && (
                <span
                  onClick={changeToLogin}
                  className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer"
                >
                  {" you have an account"}
                </span>
              )}
            </p>
          </div>

          <div className="mt-8 space-y-6 relative p-10">
            {warning && (
              <div
                className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4"
                role="alert"
              >
                <p>{warning}</p>
              </div>
            )}

            {loading && (
              <div className="rounded-md absolute top-0 left-0 right-0 bottom-0 z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
                <div
                  className="animate-spin ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"
                  style={{ borderTopColor: "#3498db" }}
                ></div>
                <h2 className="text-center text-white text-xl font-semibold">
                  Loading...
                </h2>
              </div>
            )}
            {status === STATUS.LOGIN && (
              <LoginForm
                STATUS={STATUS}
                status={status}
                changeToRegister={changeToRegister}
                changeToLogin={changeToLogin}
                changeToForget={changeToForget}
                handleOnLogin={handleOnLogin}
              />
            )}
            {status === STATUS.REGISTER && (
              <RegisterForm
                STATUS={STATUS}
                status={status}
                changeToRegister={changeToRegister}
                changeToForget={changeToForget}
                handleOnRegister={handleOnRegister}
              />
            )}
            {status === STATUS.FORGOT && (
              <ForgetForm
                STATUS={STATUS}
                status={status}
                changeToRegister={changeToRegister}
                changeToLogin={changeToLogin}
                changeToForget={changeToForget}
                handleOnForget={handleOnForget}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
