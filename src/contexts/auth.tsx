import { Auth } from "aws-amplify";
import { useRouter, useSegments } from "expo-router";
import React, { useState } from "react";
import * as Keychain from "react-native-keychain";
import * as SecureStore from "expo-secure-store";



const AuthContext = React.createContext({
  isAuthenticated: false,
  user: null,
  signIn: (values: { email: string; password: string }) => {},
  signOut: () => {},
  signUp: (values: { email: string; password: string, confirmPassword: string }) => {},
  error: "",
  loading: false,
});

// This hook can be used to access the user info.
export function useAuth() {
  return React.useContext(AuthContext);
}

// This hook will protect the route access based on user authentication.
function useProtectedRoute(user) {
  const segments = useSegments();
  const router = useRouter();

  React.useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";

    if (
      // If the user is not signed in and the initial segment is not anything in the auth group.
      !user &&
      !inAuthGroup
    ) {
      // Redirect to the sign-in page.
      router.replace("/(auth)/index");
    } else if (user && inAuthGroup) {
      // Redirect away from the sign-in page.
      router.replace("/(app)/index");
    }
  }, [user, segments]);
}

export function Provider({children}) {
  const [user, setAuth] = React.useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter()

  const signIn = async (values: { email: string, password: string}) => {
    setError('');
    try {
      const { email, password } = values;
      await Auth.signIn(email, password);
      const userInfo = await Auth.currentUserInfo();
      setAuth(userInfo);
      setIsAuthenticated(true);
      setLoading(false)
      user && router.push("/(app)/index");
    } catch (error) {
      console.log("Error signing in:", error);
    }
  };

  const signUp = async (values: {
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    const { confirmPassword, password, email } = values;
    if (password !== confirmPassword) {
      setError('Passwords do not match!')
    } else {
      setLoading(true)
      setError('');
      try {
        const user = await Auth.signUp({
          username: email,
          password,
        });
        await SecureStore.setItemAsync("authKeyEmail", email);
        await SecureStore.setItemAsync('AuthKeyPassword', password);
        user && router.push({ pathname: "confirm_sign_up", params: { email, password } });
        setLoading(false)
      } catch (err: any) {
        setLoading(false);
          if (err.code === "UserNotConfirmedException") {
            setError("Account not verified yet");
          } else if (err.code === "PasswordResetRequiredException") {
            setError("Existing user found. Please reset your password");
          } else if (err.code === "NotAuthorizedException") {
            setError("Forgot Password?");
          } else if (err.code === "UserNotFoundException") {
            setError("User does not exist!");
          } else {
            setError(err.code);
          }
      }
    }
  };

  const signOut = async () => {
    try {
      await Auth.signOut();
      setAuth(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.log("Error signing out:", error);
    }
  };

  useProtectedRoute(user);

  return (
    <AuthContext.Provider value={{ loading, signUp, error, isAuthenticated, user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}