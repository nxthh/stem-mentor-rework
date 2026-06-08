import React from "react";
import { FaEye, FaCheck } from "react-icons/fa";
import { IoMdArrowBack } from "react-icons/io";
import { IoEyeOff } from "react-icons/io5";
import { MdOutlineMailOutline } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useLoginWithGitHub } from "../../components/social-auth/GithubAuthComponent";
import { useLoginWithGoogle } from "../../components/social-auth/GoogleAuthComponent";
import { useLoginWithFacebook } from "../../components/social-auth/FacebookAuthComponent";
import { useLoginMutation } from "../../features/auth/authApi";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../features/auth/authSlice";
import { jwtDecode } from "jwt-decode";

export default function Login() {
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { gitHubLogin } = useLoginWithGitHub();
  const { googleLogin } = useLoginWithGoogle();
  const { facebookLogin } = useLoginWithFacebook();

  const schema = z.object({
    identifier: z.string().nonempty("Email is required").email("Invalid email"),
    password: z
      .string()
      .nonempty("Password is required")
      .min(8, "Password must be at least 8 characters long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character"
      ),
  });
  const getEmail = useLocation();
  const prefilledEmail = getEmail.state?.email || "";
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      // identifier: "teacherone@gmail.com",
      // password: "Teacher123!@#",
      identifier: prefilledEmail,
      // password: "Kim123!@#",

      /*
    {
  "username": "Admin2",
  "full_name": "Admin One",
  "password": "Admin1234!@#",
  "role": "Admin",
  "email": "admin1234@gmail.com"
}
  
this is admin
*/
    },

    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const result = await login(data).unwrap();
      const decoded = jwtDecode(result.access_token);
      const user = {
        id: decoded.id,
        name: decoded.sub,
        role: decoded.role,
        full_name: decoded.full_name,
      };

      if (remember) {
        localStorage.setItem(
          "auth",
          JSON.stringify({ user, token: result.access_token })
        );
      } else {
        sessionStorage.setItem(
          "auth",
          JSON.stringify({ user, token: result.access_token })
        );
      }

      dispatch(setCredentials({ user, token: result.access_token }));
      navigate("/");
    } catch (err) {
      const message =
        err?.data?.detail || err?.error || "Login failed. Please try again.";
      toast.error(message);
    } finally {
      reset();
    }
  };

  const [showPassword, setShowPassword] = React.useState(false);
  const [remember, setRemember] = React.useState(false);

  return (
    <div className="bg-primary h-[100vh] relative flex flex-col md:flex-col lg:flex-row items-center justify-center gap-10 lg:gap-20 overflow-hidden max-[350px]:overflow-auto max-[350px]:h-auto max-[350px]:py-6">
      <img
        src="/assets/cloudlogin1.png"
        className="absolute top-0 right-0 w-[120px] sm:w-[200px] lg:w-auto"
      />
      <img
        src="/assets/cloudlogin2.png"
        className="absolute bottom-0 left-0 w-[120px] sm:w-[200px] lg:w-auto"
      />

      <div className="flex flex-col lg:flex-row items-center justify-center w-full px-3 sm:px-8 max-[350px]:px-2">
        {/* LOGIN FORM */}
        <div className="bg-white rounded-lg w-full sm:w-[420px] lg:w-[500px] relative max-[350px]:rounded-lg max-[350px]:p-3 max-[350px]:py-6">
          <NavLink
            onClick={() => navigate(-1)}
            className="absolute top-4 left-4 flex items-center gap-2 max-[350px]:top-3 max-[350px]:left-3"
          >
            <IoMdArrowBack className="text-[26px] max-[350px]:text-[22px]" />
          </NavLink>

          <div className="text-center flex flex-col gap-4 pt-10 max-[350px]:pt-6">
            <h1 className="text-primary text-[30px] font-bold max-[350px]:text-[24px]">
              LOGIN
            </h1>
            <p className="text-gray-500 text-sm max-[350px]:text-xs">
              Welcome back! Let’s get you signed in
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Email Input */}
            <div className="w-auto h-[64px] bg-[#bcd9f9] rounded-lg flex mt-5 mx-5 sm:mx-8 lg:mx-10 px-4 gap-4 items-center max-[350px]:h-[52px] max-[350px]:mx-3 max-[350px]:px-2">
              <MdOutlineMailOutline className="w-auto h-[29px] text-gray-500 max-[350px]:h-[24px]" />
              <input
                placeholder="Email"
                {...register("identifier")}
                className="border-none outline-none w-full bg-transparent text-sm sm:text-base max-[350px]:text-[12px]"
              />
            </div>
            {errors.identifier && (
              <p className="text-red-500 text-sm ml-6 sm:ml-10 max-[350px]:ml-3 max-[350px]:text-[11px]">
                {errors.identifier.message}
              </p>
            )}

            {/* Password Input */}
            <div className="w-auto h-[64px] bg-[#bcd9f9] rounded-lg flex mt-5 mx-5 sm:mx-8 lg:mx-10 px-4 gap-4 items-center max-[350px]:h-[52px] max-[350px]:mx-3 max-[350px]:px-2">
              <TbLockPassword className="w-auto h-[29px] text-gray-500 max-[350px]:h-[24px]" />
              <input
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                {...register("password")}
                className="border-none outline-none w-full bg-transparent text-sm sm:text-base max-[350px]:text-[12px]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FaEye className="w-auto h-[23px] text-gray-500 max-[350px]:h-[18px]" />
                ) : (
                  <IoEyeOff className="w-auto h-[23px] text-gray-500 max-[350px]:h-[18px]" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm ml-6 sm:ml-10 max-[350px]:ml-3 max-[350px]:text-[11px]">
                {errors.password.message}
              </p>
            )}

            {/* Remember + Forget */}
            <div className="flex flex-col sm:flex-row justify-between items-center mt-3 sm:mt-2 gap-2 sm:gap-0">
              <div className="flex md:items-start lg:items-center mx-5 sm:mx-10 mt-2 max-[350px]:mx-3">
                <button
                  type="button"
                  onClick={() => setRemember((v) => !v)}
                  className={`mr-2 h-5 w-5 flex md:mt-1 lg:mt-0 items-center justify-center rounded-md border-2 border-primary cursor-pointer transition-colors ${
                    remember ? "bg-primary" : "bg-white"
                  } max-[350px]:h-4 max-[350px]:w-4`}
                >
                  {remember && (
                    <FaCheck className="text-white text-[12px] max-[350px]:text-[10px]" />
                  )}
                </button>
                <label
                  className="text-gray-900 select-none cursor-pointer text-sm sm:text-base max-[350px]:text-[12px]"
                  onClick={() => setRemember((v) => !v)}
                >
                  Remember Me
                </label>
              </div>

              <p className="text-right text-primary font-semibold mx-5 sm:mx-10 mt-2 text-sm sm:text-base cursor-pointer max-[350px]:text-[12px] max-[350px]:mx-3">
                Forget Password?
              </p>
            </div>

            {/* Submit */}
            <div className="flex justify-center items-center">
              <button
                type="submit"
                disabled={isLoading}
                className="bg-gradient-to-r  font-semibold w-full justify-center items-center from-[#253C95] to-[#0055CD] text-white  h-[48px] sm:h-[54px] rounded-lg mx-5 sm:mx-10 mt-5 hover:opacity-90 transition focus:ring-offset-2 ring-2 focus:ring-primary text-sm sm:text-base max-[350px]:h-[44px] max-[350px]:text-[12px] max-[350px]:mx-3"
              >
                {isLoading ? "Logging in..." : "Login Now"}
              </button>
            </div>
          </form>

          {/* Social login */}
          <p className="text-gray-500 py-4 sm:py-5 text-center text-sm sm:text-base max-[350px]:text-[12px]">
            Other <span className="text-primary font-bold">Login</span> With
          </p>
          <div className="flex gap-6 justify-center">
            <button className="cursor-pointer p-1" onClick={facebookLogin}>
              <img
                src="https://tse3.mm.bing.net/th/id/OIP.PtjxHgNRRTtw6OsaRub_RgHaHa?pid=Api&h=220&P=0"
                className="rounded-full w-[36px] sm:w-[44px] h-[36px] sm:h-[44px] object-cover max-[350px]:w-[30px] max-[350px]:h-[30px]"
                alt="facebook provider"
              />
            </button>
            <button className="cursor-pointer p-1" onClick={googleLogin}>
              <img
                src="https://tse2.mm.bing.net/th/id/OIP.5ALypUthwvlfLwdO6c49KwHaHa?pid=Api&h=220&P=0"
                className="rounded-full w-[36px] sm:w-[44px] h-[36px] sm:h-[44px] object-cover max-[350px]:w-[30px] max-[350px]:h-[30px]"
                alt="google provider"
              />
            </button>
            <button className="cursor-pointer p-1" onClick={gitHubLogin}>
              <img
                src="https://logos-world.net/wp-content/uploads/2020/11/GitHub-Symbol.png"
                className="rounded-full w-[36px] sm:w-[44px] h-[36px] sm:h-[44px] object-cover max-[350px]:w-[30px] max-[350px]:h-[30px]"
                alt="github provider"
              />
            </button>
          </div>

          {/* Signup */}
          <p className="text-gray-500 py-4 sm:py-5  text-center text-sm sm:text-base max-[350px]:text-[12px]">
            Don't have an account?{" "}
            <Link to={"/signup"} className="text-primary font-bold underline">
              Sign Up
            </Link>
          </p>
        </div>

        {/* IMAGE */}
        <img
          src="/assets/login.png"
          alt=""
          className="hidden md:hidden lg:block w-auto h-[418px]"
        />
      </div>
    </div>
  );
}
