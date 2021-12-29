import { generateToken } from "../middleware/authJWT";
import { Role, User } from "../model";
import bcrypt from "bcrypt";
import * as mailer from "../middleware/mailer";
import Sequelize from "sequelize";
const Op = Sequelize.Op;

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      where: { email },
      include: [
        {
          model: Role,
          attributes: ["id", "roleName"],
        },
      ],
    });

    if (!user) {
      res.status(404).send({ status: 404, message: "Invalid Account" });
    } else if (user.status === 0) {
      res.status(500).json({ status: 500, message: "Account Not Activated" });
    } else if (user.status === 3) {
      res.status(501).json({ status: 501, message: "Locked Account" });
    } else if (!bcrypt.compareSync(password, user.password)) {
      res.status(401).json({ status: 401, message: "Incorrect Password" });
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
    return res.json({
      tokenType: "Bearer",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        status: user.status,
        role: roles,
      },
      accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const register = async (req, res) => {
  try {
    const { username, password, email, firstname, lastname } = req.body;

    const user = await User.findOne({
      where: {
        [Op.or]: [
          {
            username: username,
          },
          {
            email: email,
          },
        ],
      },
    });

    if (user) {
      res
        .status(401)
        .json({ status: 401, message: "Username Or Email already exists" });
    } else {
      const passwordHash = bcrypt.hashSync(password, 10);
      const code = Math.floor(Math.random() * (1000000 - 100000)) + 100000;
      const newUser = await User.create({
        username,
        password: passwordHash,
        email,
        firstname,
        lastname,
        // status: 0,
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
          <p>Activate the account with the verification code to complete the registration.</p>
          <p>Visit the account activation link to log in <a href="http://localhost:3006/tlu/login">Active Account</a></p>`
      );
      return res.json({
        data: newUser,
        status: 200,
        message: "Successful Register, Please Check Gmail",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const logout = async (req, res) => {
  //   try {
  //     res.delete(req.user.id);
  //     res.json({
  //       status: 200,
  //       message: "LOGOUT SUCCESS",
  //     });
  //   } catch (error) {
  //     throw new BaseError(500, "INTERNAL SERVER ERROR");
  //   }
  //   try {
  //     req.user.id.splice(0, req.user.id.length);
  //     await req.user.save();
  //     res.send();
  //   } catch (error) {
  //     res.status(500).send(error);
  //   }
};
