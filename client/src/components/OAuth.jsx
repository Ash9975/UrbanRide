import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase";
import { signInFailure, signInSuccess } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/google`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: result.user.displayName,
            email: result.user.email,
            photo: result.user.photoURL,
          }),
        }
      );

      const data = await res.json();

      if (res.ok && data.isUser) {
        dispatch(signInSuccess(data));
        navigate("/");
      } else {
        dispatch(signInFailure(data));
      }
    } catch (error) {
      console.error("Google login failed:", error);
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="px-5 flex justify-center items-center gap-6 m-3 ">
      <button
        className="flex w-10 h-10 gap-3 p-7 rounded-full shadow-md justify-center border items-center hover:border-red-500 transition
"
        type="button"
        onClick={handleGoogleClick}
      >
        <i className="fa fa-google text-red-500 text-xl "></i>
      </button>

      <button
        className="flex  w-10 h-10 gap-3 p-7 rounded-full shadow-md justify-center border  items-center hover:border-blue-500 transition
"
        type="button"
      >
        <i className="fa fa-facebook text-blue-600 text-3xl"></i>
      </button>
    </div>

  );
}

export default OAuth;
