const bcrypt = require('bcrypt');
const prisma = require("../config/db.config")
const { tokenGenerator } = require('../middleware/middleware.js')
const { convertBigIntToString } = require("../helper/convertBigIntToString")

require("dotenv").config();

const SECRET = process.env.JWT_SECRET;

const createUser = async (userObj) => {
    try {
        //check whether user already exists or not
        const userExists = await findUserByEmail(userObj.email);

        if (userExists) {
            return {
                status: 409,
                data: {
                    message: "User already exists",
                },
            };
        }

        const hashedPassword = await bcrypt.hash(userObj.password, 10);

        const res = await prisma.user.create({
            data: {
                name: userObj.name,
                email: userObj.email,
                password: hashedPassword,
                oAuthId: userObj.oAuthId || null,
                provider: userObj.provider || null,
                phoneNumber: userObj.phoneNumber,
                isDeleted: false,
            },
        });

        const userRes = convertBigIntToString(res);

        if (!res) {
            return {
                status: 400,
                data: {
                    status: false,
                    message: "Failed to create user",
                },
            };
        }

        return {
            status: 201,
            data: {
                status: true,
                message: "User created successfully",
                data: userRes,
            },
        };
    } catch (error) {
        return {
            status: 500,
            data: {
                status: false,
                message: error.message || "An error occurred while creating the user",
            },
        };
    }
};

const findUserByEmail = async (email) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        if (user) return true;
    } catch (error) {
        return false;
    }
};

const loginUser = async (userObj) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: userObj.email,
            },
        });
        if (!user) return null;

        if (user) {
            const isValidPassword = await bcrypt.compare(
                userObj.password,
                user.password
            );

            if (!isValidPassword) return null;

            if (!SECRET) {
                return {
                    status: 400,
                    message: "Invalid SECRET",
                };
            }

            const payload = {
                id: user.id,
                email: user.email,
            };


            const token = tokenGenerator(payload);

            return {
                status: 200,
                data: {
                    status: true,
                    message: "Login successful",
                    user: {
                        id: user.id,
                        email: user.email,
                    },
                    token: token,
                },
            };
        }
    } catch (error) {
        return {
            status: 500,
            data: {
                status: false,
                message: error.message,
            },
        };
    }
};

const updateUserDetails = async (userId, userObj) => {
    try {
        const user = await prisma.user.update({
            where: {
                id: userId,
            },
            data: userObj,
        });

        return {
            status: 200,
            data: {
                status: true,
                message: "User updated successfully",
                user: user,
            },
        };
    } catch (error) {
        return {
            status: 500,
            data: {
                status: false,
                message: error.message,
            },
        };
    }
};


module.exports = {
    createUser,
    loginUser,
    findUserByEmail,
    updateUserDetails
}