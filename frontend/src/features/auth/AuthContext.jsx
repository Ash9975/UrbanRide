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

      if (
        token &&
        storedUser &&
        storedUser !== "undefined"
      ) {

        const parsedUser =
          JSON.parse(storedUser);

        setUser(parsedUser);

      } else {

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

  // LOGIN - backend returns { success, user, accessToken, refreshToken }
  const login = (data) => {

    const userData = data.user || data;

    const {
      accessToken,
      refreshToken,
      ...userInfo
    } = {
      ...userData,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    };

    setUser(userInfo);

    localStorage.setItem(
      "user",
      JSON.stringify(userInfo)
    );

    localStorage.setItem(
      "token",
      data.accessToken
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
