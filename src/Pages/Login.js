import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../Validations/loginValidations";
import { Oval } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../Actions/AuthActions";
const Login = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [loginError, setLoginError] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data, e) => {
    e.preventDefault();
    try {
      if (data) {
        setLoader(true);
        let response = await loginUser(data);
        if (response) {
          localStorage.setItem("userName", response.user.firstName);
          setLoader(false);
          navigate("/home");
        }
      }
    } catch (err) {
      console.log(err);
      setLoader(false);
      if (err.response) {
        setLoginError(err.response.data.message);
      } else {
        setLoginError(err.message);
      }
    }
  };
  return (
    <div className="h-screen ">
      <div className="title flex justify-center text-4xl font-bold pt-5">
        <div className="text-blue-900">DNS Manager</div>
      </div>

      <div className="loginFormWrapper flex justify-center items-center h-[89%]">
        <div className="loginForm w-[35%] bg-[#FFFF] p-14 rounded-md shadow-md">
          <div className="loginFormTitle flex justify-center mb-10">
            <div className="text-4xl font-semibold text-blue-700">Login 👨‍💻</div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-6">
              <label
                className="block dark-accent dark:text-light-accent text-sm font-bold mb-2"
                htmlFor="Email"
              >
                Email
              </label>
              <input
                className=" bg-gray-200 appearance-none border-2 border-gray-200 
                rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none
                 focus:bg-white focus:border-blue-700"
                id="email"
                type="text"
                placeholder="Email"
                {...register("email")}
              />
              {
                <div
                  className="invalid-feedback  text-red-400 text-xs px-2 pt-1"
                  style={errors.email ? { display: "block" } : {}}
                >
                  {errors.email?.message}
                </div>
              }
            </div>{" "}
            <div className="mb-10">
              <label
                className="block dark-accent dark:text-light-accent text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 
                rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none
                 focus:bg-white focus:border-blue-700"
                id="password"
                type="password"
                placeholder="Password"
                {...register("password")}
              />{" "}
              {
                <div
                  className="invalid-feedback  text-red-400  text-xs px-2 pt-1"
                  style={errors.password ? { display: "block" } : {}}
                >
                  {errors.password?.message}
                </div>
              }
            </div>
            <div
              className="invalid-feedback text-center text-output-error text-xs px-2 py-2 pt-1 "
              style={loginError ? { display: "block" } : {}}
            >
              {loginError ? loginError : null}
            </div>
            {loader ? (
              <div className=" flex justify-center w-full p-2">
                <Oval color="#5063F0" height={30} width={30} />
              </div>
            ) : (
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br
                  focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800
                  font-semibold rounded-md text-lg px-8 py-2.5 text-center me-2 mb-2"
                >
                  Login
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
