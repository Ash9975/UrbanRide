export const getUserRoleFlags = (user) => {
  return {
    isLoggedIn: !!user,
    isAdmin: user?.isAdmin === true,
    isVendor: user?.isVendor === true,
    isUser:
      user && user.isAdmin !== true && user.isVendor !== true,
  };
};
