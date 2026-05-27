import {
  createContext,
  useEffect,
  useState,
} from "react";

const AuthContext =
  createContext();

export const AuthProvider = ({
  children,
}) => {

  const [user, setUser] =
    useState(undefined);

  useEffect(() => {

    try {

      const token =
        localStorage.getItem("token");

      const storedUser =
        localStorage.getItem("user");

      // USER EXISTS
      if (
        token &&
        storedUser &&
        storedUser !== "undefined"
      ) {

        const parsedUser =
          JSON.parse(storedUser);

        setUser(parsedUser);

      } else {

        // ONLY SET NULL
        setUser(null);
      }

    } catch (error) {

      console.log(
        "Auth Load Error:",
        error
      );

      setUser(null);
    }

  }, []);
  // LOGIN
  const login = (data) => {

    const {
      accessToken,
      refreshToken,
      ...userData
    } = data;

    setUser(userData);

    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );

    localStorage.setItem(
      "token",
      accessToken
    );
  };
  
  // LOGOUT
  const logout = () => {

    setUser(null);

    localStorage.removeItem("user");

    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;