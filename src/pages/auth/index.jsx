import { auth, provider } from "../../config/firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate, Navigate } from "react-router-dom";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";

export const Auth = () => {
  const navigate = useNavigate();
  const { isAuth } = useGetUserInfo();

  const signInWithGoogle = async () => {
    const results = await signInWithPopup(auth, provider);
    const authInfo = {
      userID: results.user.uid,
      name: results.user.displayName,
      profilePhoto: results.user.photoURL,
      isAuth: true,
    };
    localStorage.setItem("auth", JSON.stringify(authInfo));
    navigate("/expense-tracker");
  };  

  if (isAuth) {
    return <Navigate to="/expense-tracker" />;
  }

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-100 to-gray-200 text-gray-800">
      <h1 className="text-sky-800 text-9xl font-extrabold mb-40">
        Track Your Expenses
      </h1>
      <p className="text-2xl font-semibold mb-4">
        Sign In With Google To Continue
      </p>
      <button
        className="bg-gray-800 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-sky-900 transition duration-300"
        onClick={signInWithGoogle}
      >
        Sign In
      </button>
    </div>
  );
};

