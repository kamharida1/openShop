import { Auth } from "aws-amplify";

export const signUp = async (username: string, password: string) => {
  try {
    const { user } = await Auth.signUp({
      username,
      password,
    });

    console.log("Sign up successful:", user);
  } catch (error) {
    console.log("Error signing up:", error);
  }
};

export const signIn = async (username: string, password: string) => {
  try {
    const { user } = await Auth.signIn(username, password);

    console.log("Sign in successful:", user);
  } catch (error) {
    console.log("Error signing in:", error);
  }
};

export const signOut = async () => {
  try {
    await Auth.signOut();

    console.log("Sign out successful");
  } catch (error) {
    console.log("Error signing out:", error);
  }
};

export const getCurrentUser = async () => {
  try {
    const user = await Auth.currentAuthenticatedUser();

    console.log("Current user:", user);
  } catch (error) {
    console.log("No current user:", error);
  }
};
