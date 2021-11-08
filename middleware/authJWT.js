import jwt from "jsonwebtoken";
import EnvConfig from "../config/env.config";

export const generateToken = (user) => {
    return jwt.sign({ data: user }, process.env.ACCESS_TOKEN_SECRET);
};

export const verifyToken = (req, res, next) => {
    const authHeader = req.header("Authorization");
    const token = authHeader && authHeader.split(" ")[1];

    if (!token)
        return res
            .status(401)
            .json({ success: false, message: "Access token not found" });

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        req.userId = decoded.userId;
        // kiem tra xong roi cho qua next()
        next();
    } catch (error) {
        console.log(error);
        return res.status(403).json({ success: false, message: "Invalid token" });
    }
};

// export const verifyToken = (roles) => (request, response, next) => {
//     if (typeof request.headers.authorization !== "undefined") {
//         let token = request.headers.authorization.split(" ")[1];
//         jwt.verify(token, EnvConfig, (err, user) => {
//             if (err) {
//                 return response.status(401).json({
//                     status: 401,
//                     message: "Incorrect token",
//                 });
//                 // throw new Error("Incorrect token");
//             }
//             if (roles && !roles.includes(user.data.role)) {
//                 return response.status(403).json({
//                     status: 403,
//                     message: "access denied",
//                 });
//             }
//             request.jwtDecoded = user.data;
//             return next();
//         });
//     } else {
//         return response.status(401).json({
//             status: 401,
//             message: "Missing token",
//         });
//         // throw new Error("Missing token");
//     }
// };