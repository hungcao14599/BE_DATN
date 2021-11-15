// import catchAsync from "../utils/catchAsync";
import * as authService from "../services/auth.service";
import BaseError from "../utils/baseError";

export const login = async(req, res) => {
    try {
        const user = await authService.login(req.body);
        // res.cookie("JWT", user.accessToken, {
        //     maxAge: 86400000 * 7,
        //     httpOnly: true,
        // });
        res.json({
            tokenType: "Bearer",
            user: user.user,
            accessToken: user.accessToken,
        });
    } catch (error) {
        console.log(error);
        throw new BaseError(500, "INTERNAL SERVER ERROR");
    }
};

export const register = async(req, res) => {
    try {
        await authService.register(req.body);
        res.json({
            status: 200,
            message: "SUCCESSFUL REGISTER! PLEASE CHECK GMAIL",
        });
    } catch (error) {
        throw new BaseError(500, "INTERNAL SERVER ERROR");
    }
};

export const logout = async(req, res) => {
    try {
        res.clearCookie("JWT");
        res.json({
            status: 200,
            message: "LOGOUT SUCCESS",
        });
    } catch (error) {
        throw new BaseError(500, "INTERNAL SERVER ERROR");
    }
};