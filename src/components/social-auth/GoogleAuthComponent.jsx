import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../../firebase/firebase-config";
import {
  useLoginMutation,
  useRegisterMutation,
} from "../../features/auth/authApi";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { setCredentials } from "../../features/auth/authSlice";

export const useLoginWithGoogle = (role = "student") => {
  const [signUpRequest] = useRegisterMutation();
  const [loginRequest] = useLoginMutation();
  const [error, setError] = useState(null);
  const [pending, setPending] = useState(false);
  const [user, setUser] = useState(null);

  const provider = new GoogleAuthProvider();
  provider.addScope("email");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user || null);
    });
    return () => unsubscribe();
  }, []);

  const googleLogin = async () => {
    setPending(true);
    setError(null);

    try {
      const res = await signInWithPopup(auth, provider);
      const user = res.user;
      console.log("✅ Google Info:", user);

      const tempPassword = `${user.displayName?.substring(0, 4) || "User"}${
        import.meta.env.VITE_SECRET_KEY
      }`;

      let loginResult;
      const googleEmail =
        user.providerData && user.providerData.length > 0
          ? user.providerData[0].email
          : null;
      console.log("googleEmail", googleEmail);
      try {
        await signUpRequest({
          username:
            "GoogleLogin_" + (user.displayName?.replace(/\s+/g, "") || "user"),
          full_name: user.displayName,
          password: tempPassword,
          role: role,
          email: googleEmail,
          gender: "UNKNOWN",
          bio: "BIO",
          address: "UNKNOWN",
          profile_url: user.photoURL,
          phone_number: "012345678",
          date_of_birth: "2000-01-01",
        }).unwrap();

        toast.success("✅ Successfully registered via Google");
      } catch (err) {
        // If user already exists, try login
        if (err?.status === 400 || err?.status === 409) {
          toast.success("✅ Successfully logged in via Google");
          loginResult = await loginRequest({
            identifier: googleEmail,
            password: tempPassword,
          }).unwrap();
        } else {
          throw err;
        }

        // Decode JWT and store in Redux
        if (loginResult?.access_token) {
          const decoded = jwtDecode(loginResult.access_token);
          const loggedUser = {
            id: decoded.id,
            name: decoded.sub,
            role: decoded.role,
            full_name: decoded.full_name,
          };

          dispatch(
            setCredentials({
              user: loggedUser,
              token: loginResult.access_token,
            })
          );
          navigate("/");
        }
      }
    } catch (err) {
      console.error("❌ Google login error:", err);
      toast.error("Google login failed");
      setError(err);
    } finally {
      setPending(false);
    }
  };

  const googleLogout = async () => {
    try {
      await signOut(auth);
      console.log("✅ Signed out successfully!");
      setUser(null);
    } catch (err) {
      console.error("❌ Sign out error:", err);
      setError(err);
    }
  };

  return { googleLogin, googleLogout, pending, error, user };
};
