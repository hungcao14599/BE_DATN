import httpStatus from "http-status";
import bcrypt from "bcrypt";
import { User, Role } from "../model";
import * as mailer from "../middleware/mailer";
import BaseError from "../utils/baseError";
import { generateToken } from "../middleware/authJWT";

export const login = async({ username, password }) => {
    if (!username || !password)
        throw new BaseError(400, "MISSING USERNAME AND / OR PASSWORD");
    try {
        const user = await User.findOne({
            where: { username },
            include: [{
                model: Role,
                attributes: ["id", "roleName"],
            }, ],
        });

        if (!user) {
            throw new BaseError(404, "USER NOT EXIST");
        } else if (!bcrypt.compareSync(password, user.password)) {
            throw new BaseError(401, "INCORRECT PASSWORD");
        } else if (user.status === 0) {
            throw new BaseError(500, "NOT ACTIVE");
        } else if (user.status === 3) {
            throw new BaseError(501, "BLOCK");
        }
        const roles = [];
        user.roles.forEach((role) => {
            roles.push(role.roleName);
        });
        const accessToken = generateToken({
            id: user.id,
            username: user.username,
            email: user.email,
            avatar: user.avatar,
            status: user.status,
            role: roles,
        });
        return {
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                avatar: user.avatar,
                status: user.status,
                role: roles,
            },
            accessToken,
        };
    } catch (error) {
        console.log(error);
        throw new BaseError(500, "INTERNAL SERVER ERROR");
    }
};

export const register = async({
    username,
    password,
    email,
    firstname,
    lastname,
}) => {
    if (await User.findOne({ where: { username } })) {
        throw new BaseError(401, "USERNAME ALREADY EXISTS");
    }
    if (await User.findOne({ where: { email } })) {
        throw new BaseError(402, "EMAIL ALREADY EXISTS");
    }
    try {
        const passwordHash = bcrypt.hashSync(password, 10);
        const code = Math.floor(Math.random() * (1000000 - 100000)) + 100000;
        const newUser = await User.create({
            username,
            password: passwordHash,
            email,
            firstname,
            lastname,
            status: 0,
            verifyCode: code,
            createdAt: Date.now() + 3600000 * 7,
            updatedAt: Date.now() + 3600000 * 7,
            avatar: "blank.jpg",
        });
        await newUser.addRole(3);
        mailer.sendMail(
            email,
            "Notice of account registration",
            `<h2>Successful Refistration!<h2/>
            <p style="font-weight:500;">Your verification code is: <span style="font-weight:600;">${code}</span></p>
            <p>Activate the account with the verification code to complete the registration.</p>`
        );
        return newUser;
    } catch (error) {
        console.log(error);
        throw new BaseError(500, "INTERNAL SERVER ERROR");
    }
};