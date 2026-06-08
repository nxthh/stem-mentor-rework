import React, { useState } from "react";
import { BiLeftArrow, BiSolidLeftArrowAlt } from "react-icons/bi";
import { FaEye, FaFacebook, FaRegUser } from "react-icons/fa";
import { IoMdArrowBack } from "react-icons/io";
import { IoEyeOff } from "react-icons/io5";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLockPasswordFill, RiMvAiLine } from "react-icons/ri";
import { TbLockPassword, TbMailExclamation } from "react-icons/tb";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useLoginWithGitHub } from "../../components/social-auth/GithubAuthComponent";
import { useLoginWithGoogle } from "../../components/social-auth/GoogleAuthComponent";
import { useLoginWithFacebook } from "../../components/social-auth/FacebookAuthComponent";
import { useRegisterMutation } from "../../features/auth/authApi";
import { toast } from "react-toastify";

export default function Signup() {
  const [role, setRole] = useState("student");

  const [registerUser] = useRegisterMutation(role);
  const { gitHubLogin } = useLoginWithGitHub(role);
  const { googleLogin } = useLoginWithGoogle(role);
  const { facebookLogin } = useLoginWithFacebook();

  const schema = z.object({
    full_name: z.string().nonempty("Full name is required"),
    email: z.string().nonempty("Email is required").email("Invalid email"),
    password: z
      .string()
      .nonempty("Password is required")
      .min(8, "Password must be at least 8 characters long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character"
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const generateUsername = (fullName) =>
    fullName.toLowerCase().replace(/\s+/g, "");

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      role: role,
      bio: "BIO",
      gender: "UNKNOWN",
      address: "UNKNOWN",
      profile_url:
        "https://static.vecteezy.com/system/resources/previews/024/983/914/non_2x/simple-user-default-icon-free-png.png",
      username: generateUsername(data.full_name),
      phone_number: "012345678",
      date_of_birth: "2000-01-01",
    };
    try {
      await registerUser(payload).unwrap();
      toast.success("Account created successfully!");
      navigate("/login", { state: { email: data.email } });
    } catch (error) {
      if (error?.data?.detail?.includes("Username already exists")) {
        toast.error("Username already exists!");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="bg-primary min-h-screen relative flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20 px-4 md:px-0">
      {/* Background Clouds */}
      <img
        src="/assets/cloudlogin1.png"
        className="absolute top-0 left-0 transform scale-x-[-1] w-40 md:w-60 lg:w-80"
        alt="cloud"
      />
      <img
        src="/assets/cloudlogin2.png"
        className="absolute bottom-0 right-0 transform scale-x-[-1] w-40 md:w-60 lg:w-80"
        alt="cloud"
      />

      {/* Form */}
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
        <div className="bg-white rounded-lg w-full max-w-md md:max-w-[500px] relative shadow-lg">
          <NavLink
            onClick={() => navigate(-1)}
            className="absolute top-4 left-4 flex items-center gap-2"
          >
            <IoMdArrowBack className="text-[26px]" />
          </NavLink>

          <div className="text-center flex flex-col gap-2 pt-10 px-6 md:px-10">
            <h1 className="text-primary   text-[28px] md:text-[30px] font-bold">
              SIGN UP
            </h1>
            <p className="text-gray-500 text-sm md:text-base">
              Join us today and explore amazing courses
            </p>
          </div>

          <div className="flex justify-center gap-2 md:gap-4 mt-4 mx-6 md:mx-10">
            <button
              type="button"
              onClick={() => setRole("student")}
              className={`px-3 py-2 md:px-4 md:py-2 w-1/2 rounded-lg font-semibold text-sm md:text-base ${
                role === "student"
                  ? "bg-[#253C95] text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Student
            </button>
            <button
              type="button"
              onClick={() => setRole("teacher")}
              className={`px-3 py-2 md:px-4 md:py-2 w-1/2 rounded-lg font-semibold text-sm md:text-base ${
                role === "teacher"
                  ? "bg-[#253C95] text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Instructor
            </button>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="px-6 md:px-10 py-5"
          >
            {/* Full Name */}
            <div className="flex items-center gap-4 bg-[#bcd9f9] rounded-lg h-14 px-3 md:px-4">
              <FaRegUser className="text-gray-500 w-5 h-5 md:w-6 md:h-6" />
              <input
                {...register("full_name")}
                placeholder="Full name"
                className="flex-1 border-none outline-none bg-transparent text-sm md:text-base"
              />
            </div>
            {errors.full_name && (
              <p className="text-red-500 text-xs md:text-sm mt-1">
                {errors.full_name.message}
              </p>
            )}

            {/* Email */}
            <div className="flex items-center gap-4 bg-[#bcd9f9] rounded-lg h-14 px-3 md:px-4 mt-4">
              <MdOutlineMailOutline className="text-gray-500 w-5 h-5 md:w-6 md:h-6" />
              <input
                {...register("email")}
                placeholder="Email"
                className="flex-1 border-none outline-none bg-transparent text-sm md:text-base"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs md:text-sm mt-1">
                {errors.email.message}
              </p>
            )}

            {/* Password */}
            <div className="flex items-center gap-4 bg-[#bcd9f9] rounded-lg h-14 px-3 md:px-4 mt-4">
              <TbLockPassword className="text-gray-500 w-5 h-5 md:w-6 md:h-6" />
              <input
                {...register("password")}
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                className="flex-1 border-none outline-none bg-transparent text-sm md:text-base"
              />
              <button type="button" onClick={togglePasswordVisibility}>
                {showPassword ? (
                  <FaEye className="text-gray-500 w-5 h-5 md:w-6 md:h-6" />
                ) : (
                  <IoEyeOff className="text-gray-500 w-5 h-5 md:w-6 md:h-6" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs md:text-sm mt-1">
                {errors.password.message}
              </p>
            )}

            {/* Submit */}
            <div className="flex flex-col items-center mt-5">
              <button
                type="submit"
                className="bg-gradient-to-r w-[100%] from-[#253C95] to-[#0055CD] text-white font-semibold h-12   rounded-lg hover:opacity-90 transition focus:ring-2 focus:ring-primary"
              >
                Sign Up
              </button>

              <p className="text-gray-500 py-4 text-sm md:text-base">
                Or <span className="text-primary font-bold">Sign Up</span> With
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

              <p className="text-gray-500 py-4 text-sm md:text-base">
                Already have account?{" "}
                <Link to="/login" className="text-primary font-bold underline">
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* Side Image */}
        <img
          src="/assets/singup.png"
          alt="signup"
          className="w-full sm:block hidden max-w-xs md:max-w-sm lg:max-w-md object-contain"
        />
      </div>
    </div>
  );
}