import { useRouter, useSegments } from "expo-router";
import React, { createContext, useState } from "react";

type Context = {
  isLoggedIn: boolean;
  setIsLoggedIn: (loggedIn: boolean) => void;
};

type Props = {
  children: JSX.Element;
};

export const AuthContext = createContext<Context>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

function useProtectedRoute(isLoggedIn: boolean) {
  const segments = useSegments();
  const router = useRouter();

  React.useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";

    if (
      // If the user is not signed in and the initial segment is not anything in the auth group.
      !isLoggedIn &&
      !inAuthGroup
    ) {
      // Redirect to the sign-in page.
      router.replace("(auth)");
    } else if (isLoggedIn && inAuthGroup) {
      // Redirect away from the sign-in page.
      router.replace("(app)");
    }
  }, [isLoggedIn, segments]);
}


export function AuthProvider(props: Props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useProtectedRoute(isLoggedIn);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {props.children}
    </AuthContext.Provider>
  );
}
