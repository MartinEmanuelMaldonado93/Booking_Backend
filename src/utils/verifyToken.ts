// import { RequestHandler } from "express";
// import { createError } from "../utils/createError";
// import jwt from "jsonwebtoken";

// export const verifyToken:RequestHandler = (req, res, next) => {
//   // console.log(req.cookie);
//   // req.cookies undefined
//   const token = req.cookies.access_token;
//   if (!token) {
//     return next(createError(401, "[token] You aren't authenticated."));
//   }

//   jwt.verify(token, process.env.JWT, (err, user) => {
//     if (err) return next(createError(403, "Token is not valid."));
//     req.user = user; // any property is allowed
//     next();
//   });
// };

// export const verifyUser: RequestHandler = (req, res, next) => {
//   verifyToken(req, res, next, () => {
//     if (req.user.id === req.params.id || req.user.isAdmin) {
//       next();
//     } else {
//       next(createError(403, "You aren't authorized."));
//     }
//   });
// };

// export const verifyAdmin: RequestHandler = (req, res, next) => {
//   verifyToken(req, res, next, () => {
//     if (req.user.isAdmin) {
//       next();
//     } else {
//       next(createError(403, "[verify admin] You aren't authorized."));
//     }
//   });
// };
