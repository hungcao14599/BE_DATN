import { User, Role, Friend } from "../model";
import { Op } from "../config/connect";
import httpStatus from "http-status";
export const fetchAllUsers = async({ page = 1, size = 10, search = "" }) => {
    const where = {
        isDelete: false,
        status: 1,
    };
    if (search !== "") {
        where = {
            isDelete: false,
            status: 1,
            // [Op.or]: [{
            username: {
                [Op.like]: `%${search}`,
            },
            // }, ],
        };
    }
    try {
        const users = await User.findAndCountAll({
            where,
            limit: size,
            offset: size * (page - 1),
            include: [{
                    model: Role,
                    attributes: ["id", "role_name"],
                },
                {
                    model: Friend,
                },
            ],
            distinct: true,
            attributes: [
                "id",
                "username",
                "email",
                "firstname",
                "lastname",
                "avatar",
                "phone",
                "status",
                "birthday",
                "gender",
                "description",
            ],
        });
        return {
            data: users.rows,
            size,
            length: users.length,
            currentPage: page,
            totalPage: Math.ceil(users.count / size),
            totalElements: users.count,
        };
    } catch (error) {
        throw new BaseError(httpStatus[500], "INTERNAL SERVER ERROR");
    }
};

export const fetchUserByName = async({ username }) => {
    try {
        const user = await User.findOne({
            where: {
                username,
                isDelete: false,
            },
            include: [{
                    model: Role,
                    attributes: ["id", "role_name"],
                },
                {
                    model: Friend,
                    limit: 10,
                    offset: 0,
                    distinct: true,
                    include: [{
                        model: User,
                        as: "ban",
                        attributes: ["id", "username", "avatar", "description"],
                    }, ],
                },
            ],
            attributes: [
                "id",
                "username",
                "email",
                "firstname",
                "lastname",
                "avatar",
                "phone",
                "status",
                "birthday",
                "gender",
                "description",
                "address",
            ],
        });
        if (!user) {
            throw new BaseError(httpStatus.NOT_FOUND, "INVALID USER");
        }
        return user;
    } catch (error) {
        throw new BaseError(httpStatus[500], "INTERNAL SERVER ERROR");
    }
};

export const updateUserInfo = async(
    id, { firstname, lastname, phone, birthday, gender, description, address }
) => {
    const user = await User.findOne({
        where: {
            id,
        },
        include: [{
                model: Role,
                attributes: ["id", "role_name"],
            },
            {
                model: Friend,
                limit: 10,
                offset: 0,
                distinct: true,
                include: [{
                    model: User,
                    as: "ban",
                    attributes: ["id", "username", "avatar", "description"],
                }, ],
            },
        ],
        attributes: [
            "id",
            "username",
            "email",
            "firstname",
            "lastname",
            "avatar",
            "phone",
            "status",
            "birthday",
            "gender",
            "description",
            "address",
        ],
    });
    try {
        await user.update({
            firstname: firstname ? firstname : user.firstname,
            lastname: lastname ? lastname : user.lastname,
            phone: phone ? phone : user.phone,
            birthday: birthday ? birthday : user.birthday,
            gender: gender ? gender : user.gender,
            description: description ? description : user.description,
            address: address ? address : user.address,
        });
        return user;
    } catch (error) {
        throw new BaseError(httpStatus[500], "INTERNAL SERVER ERROR");
    }
};