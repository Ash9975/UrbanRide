import { useState } from "react";
import styles from "../../index";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../../components/OAuth";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

//zod validation schema
const schema = z.object({
  username: z.string().min(3, { message: "minimum 3 characters required" }),
  email: z
    .string()
    .min(1, { message: "email required" })
    .refine((value) => /\S+@\S+\.\S+/.test(value), {
      message: "Invalid email address",
    }),
  password: z.string().min(4, { message: "minimum 4 characters required" }),
});

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  // const onSubmit = async (formData, e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   try {
  //     const res = await fetch("/api/auth/signup", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(formData),
  //     });
  //     const data = await res.json();
  //     setLoading(false);
  //     if (data.success === false) {
  //       setError(true);
  //       return;
  //     }
  //     setError(false);
  //     navigate("/signin");
  //   } catch (error) {
  //     setLoading(false);
  //     setError(true);
  //   }
  // };
  const onSubmit = async (formData) => {
    setLoading(true);

    setTimeout(() => {
      console.log("Form Data:", formData);
      setLoading(false);
      setError(false);
      navigate("/signin");
    }, 1000);
  };


  return (
    <>
      <div className="min-h-screen min-w-full flex justify-end items-center ">
        <img src="./src/Assets/signUpBg.png" alt="" />
        <div
          className={` relative w-[1000px] p-20 h-[950px] m-[50px] mt-[70px] md:mt-[80px] rounded-3xl overflow-hidden  shadow-2xl bg-white flex flex-col justify-center items-center`}
        >
          <h1 className="logo-font font-bold absolute top-3 left-50 m-11 text-4xl">UrbanRide</h1>

          <div
            className={`px-6 py-2 rounded-t-lg flex justify-between items-center`}
          >
            <h1 className={`text-5xl  font-thin tracking-wide text-gray-700 mt-20`}>Sign Up</h1>
            <Link to={"/"}>
              <div className=" px-5 py-2  text-3xl font-bold hover:text-white   hover:bg-red-600 transition-colors duration-300 ease-in-out rounded-md  shadow-inner absolute top-3 right-3 m-8">
                x
              </div>
            </Link>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3 pt-5 px-5"
          >
            <div>
              <input
                type="text"
                id="username"
                className="text-gray-800 border-[3px] px-8 py-5 mt-5 rounded-full w-[500px] text-xl"
                placeholder="UserName"
                {...register("username")}
              />
              {errors.username && (
                <p className="text-red-500 text-[13px] ml-5 mt-2">
                  {" "}
                  {errors.username.message}
                </p>
              )}
            </div>

            <div>
              <input
                type="text"
                id="email"
                className="text-gray-800 border-[3px] px-8 py-5 mt-5 rounded-full w-[500px] text-xl"
                placeholder="Email"
                {...register("email")}
              />

              {errors.email && (
                <p className="text-red-500 text-[13px] ml-5 mt-2">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <input
                type="password"
                id="password"
                className="text-gray-800 border-[3px] px-8 py-5 mt-5 rounded-full w-[500px] text-xl"
                placeholder="Password"
                {...register("password", { required: true, minLength: 6 })}
              />
              {errors.password && (
                <p className="text-red-500 text-[13px] ml-5 mt-2 ">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              className={`px-8 py-5 mt-6 bg-green-400 rounded-full w-full  font-bold text-2xl  disabled:bg-slate-500 text-white disabled:text-white `}
              disabled={isLoading}
            >
              {isLoading ? "Loading ..." : "Register"}
            </button>
            <div className="flex justify-between">

              <p className="text-[10px] text-red-600">
                {isError && "something went wrong"}
              </p>
            </div>
          </form>
          <div>
            <div className="flex justify-center items-center gap-3 py-t">
              <span className="bg-green-300 w-20 h-[.1px]"></span>
              <span className="text-[13px] sm:text-[14px] text-slate-500 my-5">
                Or continue with
              </span>
              <span className="bg-green-300 w-20 h-[.1px]"> </span>
            </div>

            <OAuth />
            <p className="text-[15px]  text-gray-500 flex justify-center items-center flex-row p-6">
              Have an account?{" "}
              <span className="text-blue-600">
                {" "}
                <Link to={`/signin`}>Sign in</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
