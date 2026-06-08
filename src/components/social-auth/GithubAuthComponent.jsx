import {
  GithubAuthProvider,
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

export const useLoginWithGitHub = (role = "student") => {
  const [signUpRequest] = useRegisterMutation();
  const [loginRequest] = useLoginMutation();
  const [error, setError] = useState(null);
  const [pending, setIsPending] = useState(false);
  const [user, setUser] = useState(null);

  const provider = new GithubAuthProvider();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user || null);
    });
    return () => unsubscribe();
  }, []);

  const gitHubLogin = async () => {
    setIsPending(true);
    setError(null);
    try {
      const res = await signInWithPopup(auth, provider);
      const user = res.user;
      console.log("✅ GitHub Info:", user);

      const tempPassword = `${user.displayName?.substring(0, 4) || "User"}${
        import.meta.env.VITE_SECRET_KEY
      }`;
      let loginResult;
      const githubEmail =
        user.providerData && user.providerData.length > 0
          ? user.providerData[0].email
          : null;
      console.log("githubEmail", githubEmail);
      try {
        await signUpRequest({
          username:
            "GitHubLogin_" + (user.displayName.replace(/\s+/g, "") || "user"),
          full_name: user.displayName,
          password: tempPassword,
          role: role,
          email: githubEmail,
          gender: "UNKNOWN",
          bio: "BIO",
          address: "UNKNOWN",
          profile_url: user.photoURL,
          phone_number: "012345678",
          date_of_birth: "2000-01-01",
        }).unwrap();
        toast.success("✅ Successfully registered via GitHub");
      } catch (err) {
        // If user already exists, try login
        if (err?.status === 400 || err?.status === 409) {
          toast.success(" Successfully logged in via GitHub");
          loginResult = await loginRequest({
            identifier: githubEmail,
            password: tempPassword,
          }).unwrap();
        } else {
          throw err;
        }
        //decode jwt
        console.log(loginResult);
        if (loginResult?.access_token) {
          const decoded = jwtDecode(loginResult.access_token);
          const loggedUser = {
            id: decoded.id,
            name: decoded.sub,
            role: decoded.role,
            full_name: decoded.full_name,
          };
          console.log(user);

          dispatch(
            setCredentials({
              user: loggedUser,
              token: loginResult.access_token,
            })
          );
          navigate("/");
        }
      }
    } catch (error) {
      console.error("❌ GitHub login error:", error);
      toast.error("GitHub login failed");
      setError(error);
    } finally {
      setIsPending(false);
    }
  };

  const gitHubLogout = async () => {
    try {
      await signOut(auth);
      console.log("✅ Signed out successfully!");
      setUser(null);
    } catch (error) {
      console.error("❌ Sign out error:", error);
      setError(error);
    }
  };

  return { gitHubLogout, gitHubLogin, pending, error, user };
};
