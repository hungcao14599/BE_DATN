import jwt from "jsonwebtoken";

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

        req.user = decoded.data;
        next();
    } catch (error) {
        console.log(error);
        return res.status(403).json({ success: false, message: "Invalid token" });
    }
};

export const verifyTokenRole = (roles) => (req, res, next) => {
    if (typeof req.headers.authorization !== "undefined") {
        let token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                return response.status(401).json({
                    status: 401,
                    message: "Incorrect token",
                });
                // throw new Error("Incorrect token");
            }

            if (roles && !roles.includes(user.data.role)) {
                return res.status(403).json({
                    status: 403,
                    message: "access denied",
                });
            }
            req.user = user.data;
            return next();
        });
    } else {
        return res.status(401).json({
            status: 401,
            message: "Missing token",
        });
    }
};