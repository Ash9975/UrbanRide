import styles from "../../index";
import { Link, useNavigate } from "react-router-dom";
import {
  loadingEnd,
  signInFailure,
  signInStart,
  signInSuccess,
} from "../../redux/user/userSlice";
import { BsX } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../../components/OAuth";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  email: z
    .string()
    .min(1, { message: "email required" })
    .refine((value) => /\S+@\S+\.\S+/.test(value), {
      message: "Invalid email address",
    }),
  password: z.string().min(1, { message: "password required" }),
});

// export const refreshToken = async (dispatch,getState) => {
//   const { authSlice } = getState();

//   if (!authSlice.refreshToken) {
//     // No refresh token available, handle the situation (e.g., log out the user)
//     dispatch(logout());
//     return;
//   }

//   try {
//     const res = await fetch('/api/auth/refresh', {
//       method: 'POST',
//       credentials: 'include', // Include cookies in the request
//     });

//     const data = await res.json();

//     if (!res.ok) {
//       dispatch(refreshTokenFailure(data));
//       return;
//     }

//     // The server should set the new access token and refresh token in the response cookies
//     dispatch(refreshTokenSuccess(data));
//   } catch (err) {
//     dispatch(signInFailure(err));
//   }
// }

function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const { isLoading, isError } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (formData, e) => {
    const BASE_URL = import.meta.env.VITE_PRODUCTION_BACKEND_URL;
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch(`${BASE_URL}/api/auth/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data?.accessToken) {
        localStorage.removeItem(("accessToken"))
        localStorage.setItem("accessToken", data.accessToken);
      }
      if (data?.refreshToken) {
        localStorage.removeItem(("refreshToken"))
        localStorage.setItem("refreshToken", data.refreshToken)
      }

      if (data.success === false || !res.ok) {
        dispatch(loadingEnd());
        dispatch(signInFailure(data));

        return;
      }
      if (data.isAdmin) {
        dispatch(signInSuccess(data));
        dispatch(loadingEnd());
        navigate("/adminDashboard");
      } else if (data.isUser) {
        dispatch(signInSuccess(data));
        dispatch(loadingEnd());
        navigate("/");
      } else {
        dispatch(loadingEnd());
        dispatch(signInFailure(data));
      }
      // dispatch(loadingEnd());
      // dispatch(signInFailure("something went wrong"));
    } catch (error) {
      dispatch(loadingEnd());
      dispatch(signInFailure(error));
    }
  };

  return (
    <>
      <div className="min-h-screen min-w-full flex justify-end items-center ">
        <img src="./src/Assets/singInBg.png" alt="" />
        <div
          className={` relative w-[1000px] p-20 h-[950px] m-[50px] mt-[70px] md:mt-[80px] rounded-3xl overflow-hidden  shadow-2xl bg-white flex flex-col justify-center items-center`}
        >
          <h1 className="logo-font font-bold absolute top-3 left-50 m-11 text-4xl">UrbanRide</h1>
          <div
            className={`px-6 py-2 rounded-t-lg flex justify-between items-center`}
          >

            <h1 className={`text-5xl  font-thin tracking-wide text-gray-700 mt-12`}>Sign In</h1>
            <Link to={"/"} onClick={() => dispatch(loadingEnd())}>
              <div className=" px-5 py-2  text-3xl font-bold hover:text-white   hover:bg-red-600 transition-colors duration-300 ease-in-out rounded-md  shadow-inner absolute top-3 right-3 m-8">
                x
              </div>
            </Link>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-8 pt-10"
          >
            <div>
              <input
                type="text"
                id="email"
                className="text-gray-800 border-[3px] px-8 py-5 mt-5 rounded-full w-[500px] text-xl"
                placeholder="Email address"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-[13px] ml-5 mt-2">{errors.email.message}</p>
              )}
            </div>

            <div>
              <input
                type="text"
                id="password"
                className="text-gray-800 border-[3px] px-8 py-5  rounded-full w-full text-xl"
                placeholder="Password"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500 text-[13px] ml-5 mt-2">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              className={` px-8 py-5  bg-green-400 rounded-full w-full  font-bold text-2xl  disabled:bg-slate-500 text-white disabled:text-white `}
              disabled={isLoading}
            >
              {isLoading ? "Loading ..." : "Login"}
            </button>
            <div className="flex justify-between items-center ml-5">
              <div className="flex justify-between items-center">
                {isError && (
                  <p className="text-[13px] text-red-600">
                    Something went wrong
                  </p>
                )}
              </div>

              <p className="text-[15px] pr-5 text-blue-600">Forgot Password ?</p>
            </div>
          </form>
          <div>
            {/* <h3 className="text-center text-slate-500 py-5 font-bold text-[15px]">
              OR
            </h3> */}
            <div className="flex justify-center items-center gap-3 pt-10 pb-6">
              <span className="bg-green-300 w-20 h-[.1px]"></span>
              <span className="text-[13px] sm:text-[14px] text-slate-500">
                Or continue with
              </span>
              <span className="bg-green-300 w-20 h-[.1px]"> </span>
            </div>

            <OAuth />
            <p className="text-[15px]  text-gray-500 flex justify-center items-center flex-row p-6">
              Do not have account?{" "}
              <span className="text-blue-600 pl-1">
                {" "}
                <Link to={`/signup`}>Sign Up</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignIn;
