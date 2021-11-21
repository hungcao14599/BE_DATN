import { User, Role, Friend, Image } from "../model";
import httpStatus from "http-status";
import Sequelize from "sequelize";
const Op = Sequelize.Op;

const attributes = [
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
];
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
                [Op.like]: `%${search}%`,
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
            attributes: attributes,
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
            attributes: attributes,
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
                attributes: ["id", "roleName"],
            },
            // {
            //     model: Friend,
            //     limit: 10,
            //     offset: 0,
            //     distinct: true,
            //     include: [{
            //         model: User,
            //         as: "ban",
            //         attributes: ["id", "username", "avatar", "description"],
            //     }, ],
            // },
        ],
        attributes: attributes,
    });
    try {
        await user.update({
            ...user,
            firstname,
            lastname,
            phone,
            birthday,
            gender,
            description,
            address,
        });
        return user;
    } catch (error) {
        throw new BaseError(httpStatus[500], "INTERNAL SERVER ERROR");
    }
};

export const verifyAccount = async({ verifyCode, email }) => {
    try {
        const account = await User.findOne({ where: { email } });
        if (!account) throw new BaseError(httpStatus[404], "INVALID EMAIL");
        if (account.status !== 0)
            throw new BaseError(httpStatus[405], "ACCOUNT ACTIVATED");
        if (account.verifyCode !== verifyCode)
            throw new BaseError(httpStatus[405], "INCORRECT CODE");
        await account.update({
            status: 1,
            updatedAt: Date.now(),
        });
    } catch (error) {
        throw new BaseError(httpStatus[500], "INTERNAL SERVER ERROR");
    }
};

export const findUserByKeyword = async({
    page = 1,
    size = 10,
    keyword = "",
}) => {
    try {
        const users = await User.findAndCountAll({
            where: {
                isDelete: false,
                [Op.or]: [{
                        username: {
                            [Op.like]: `%${keyword}%`,
                        },
                    },
                    {
                        email: {
                            [Op.like]: `%${keyword}%`,
                        },
                    },
                    {
                        phone: {
                            [Op.like]: `%${keyword}%`,
                        },
                    },
                ],
            },

            include: [{
                model: Role,
                attributes: ["id", "roleName"],
            }, ],
            limit: parseInt(size),
            offset: size * (page - 1),
            distinct: true,
            attributes: attributes,
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

export const fetchImgByUsername = async({ username }) => {
    try {
        const user = await User.findOne({ where: { username } });
        if (!user) throw new BaseError(httpStatus.NOT_FOUND, "INVALID USER");
        const images = await Image.findAll({
            where: { createdBy: user.id, isDelete: false },
            limit: 9,
        });
        return images;
    } catch (error) {
        throw new BaseError(httpStatus[500], "INTERNAL SERVER ERROR");
    }
};

export const setBlockUser = async(id) => {
    const user = await User.findOne({
        where: {
            id,
        },
        include: [{
                model: Role,
                attributes: ["id", "roleName"],
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
        attributes: attributes,
    });
    if (!user) {
        throw new BaseError(httpStatus.NOT_FOUND, "INVALID USER");
    }
    try {
        await user.update({
            status: 3,
        });
        return user;
    } catch (error) {
        throw new BaseError(httpStatus[500], "INTERNAL SERVER ERROR");
    }
};

export const setUnBlockUser = async(id) => {
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
        attributes: attributes,
    });
    if (!user) {
        throw new BaseError(httpStatus.NOT_FOUND, "INVALID USER");
    }
    try {
        await user.update({
            ...user,
            status: 1,
        });
        return user;
    } catch (error) {
        throw new BaseError(httpStatus[500], "INTERNAL SERVER ERROR");
    }
};

export const fetchAllBlockedUsers = async({
    size = 10,
    page = 1,
    keyword = "",
}) => {
    const where = { isDelete: false, status: 3 };
    if (keyword) {
        where = {
            [Op.or]: [{
                username: {
                    [Op.like]: `%${keyword}%`,
                },
            }, ],
        };
    }
    try {
        const users = await User.findAndCountAll({
            where,
            include: [{
                    model: Role,
                    attributes: ["id", "roleName"],
                },
                {
                    model: Friend,
                },
            ],
            limit: parseInt(size),
            offset: size * (page - 1),
            distinct: true,
            attributes: attributes,
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