// import jwt from "jsonwebtoken";
// import { errorHandler } from "./error.js";
// import User from "../models/userModel.js";
// import { refreshToken } from "../controllers/authController.js";

// export const verifyToken = async (req, res, next) => {
//   // const accessToken = req.cookies.access_token;
//   // const refreshToken = req.cookies.refresh_token;
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return next(errorHandler(401, "Notoken"));
//   }

//   const refreshToken = req.headers.authorization.split(" ")[1].split(",")[0];
//   const accessToken = req.headers.authorization.split(" ")[1].split(",")[1];

//   if (!accessToken) {
//     if (!refreshToken) {
//       // res.clearCookie('access_token',"refresh_token")
//       return next(errorHandler(401, "You are not authenticated"));
//     }

//     try {
//       const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN);
//       const user = await User.findById(decoded.id);

//       if (!user) return next(errorHandler(403, "Invalid refresh token"));

//       if (user.refreshToken !== refreshToken)
//         return next(errorHandler(403, "Invalid refresh token"));

//       const newAccessToken = jwt.sign(
//         { id: user._id },
//         process.env.ACCESS_TOKEN,
//         { expiresIn: "15m" }
//       );
//       const newRefreshToken = jwt.sign(
//         { id: user._id },
//         process.env.REFRESH_TOKEN,
//         { expiresIn: "7d" }
//       );

//       // Update the refresh token in the database for the user
//       await User.updateOne(
//         { _id: user._id },
//         { refreshToken: newRefreshToken }
//       );

//       req.user = decoded.id; //setting req.user so that next middleware in this cycle can acess it
//       next();
//     } catch (error) {
//       console.log(error);
//       next(error);
//     }
//   } else {
//     try {
//       const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN);
//       req.user = decoded.id; //setting req.user so that next middleware in this cycle can acess it
//       next();
//     } catch (error) {
//       if (error.name === "TokenExpiredError") {
//         if (!refreshToken) {
//           return next(errorHandler(401, "You are not authenticated"));
//         }

//         // Access token expired, try to refresh it
//         //try to refresh it
//       } else {
//         next(errorHandler(403, "Token is not valid"));
//       }
//     }
//   }
// };

import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";

export const verifyToken = (req, res, next) => {

  console.log("AUTH HEADER:", req.headers.authorization);

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {

    console.log("NO TOKEN");

    return next(
      errorHandler(401, "No token provided")
    );
  }

  const token = authHeader.split(" ")[1];

  console.log("TOKEN:", token);

  try {

    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN
    );

    // console.log("DECODED:", decoded);

    req.user = decoded;;

    next();

  } catch (error) {

    console.log("JWT ERROR:", error);

    return next(
      errorHandler(401, "Invalid token")
    );
  }
};