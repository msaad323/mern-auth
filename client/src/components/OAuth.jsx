import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice.js";
function OAuth() {
  const dispatch = useDispatch();

  const handleGoogleClick = async () => {
    try {
      const authInfo = await signInWithPopup(auth, provider);
      console.log({ authInfo });
      const response = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: authInfo.user.displayName,
          email: authInfo.user.email,
          profileUrl: authInfo.user.photoURL
        }),
      })
      const data = await response.json();
      console.log({data})
      dispatch(signInSuccess(data));
    } catch (error) {
      console.error("Error signing in with Google", error);
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogleClick}
      className="bg-red-700 text-white p-3 uppercase rounded-lg hover:opacity-85 cursor-pointer"
    >
      Continue with Google
    </button>
  );
}

export default OAuth;
