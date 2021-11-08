// import catchAsync from "../utils/catchAsync";
import * as authService from "../services/auth.service";

export const login = async(req, res) => {
    const user = await authService.login(req.body);
    // response.cookie("JWT", user.token, {
    //     maxAge: 86400000 * 7,
    //     httpOnly: true,
    // });
    res.json({
        tokenType: "Bearer",
        user: user.user,
        accessToken: user.accessToken,
    });
};

export const register = async(req, res) => {
    await authService.register(req.body);
    res.json({
        status: 200,
        message: "register success! Please check gmail",
    });
};