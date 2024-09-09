const { userDataAccess } = require("../data_access/dataAccess");

// User Registration Service
const userRegisterService = async (userObj) => {
    try {
        const res = await userDataAccess.createUser(userObj);

        if (res.status === 201) {
            return {
                status: res.status,
                message: res.data.message,
                data: res.data.data
            };
        }

        return {
            status: res.status,
            message: res.data.message,
            data: res.data.data,
        };

    } catch (error) {
        return {
            status: 400,
            error: "Error parsing user data",
        };
    }
};

// User Login Service
const userLoginService = async (userObj) => {
    try {
        const res = await userDataAccess.loginUser(userObj);

        if (!res) return { error: "Invalid Credentials", status: 400 };

        // Ensure `res` is defined and contains a `status` property
        if (res) {
            if (res.status === 200) {
                return {
                    status: 200,
                    message: res.data?.message || "Login successful",
                    data: {
                        user: res.data?.user || null,
                        token: res.data?.token || null,
                    },
                };
            } else if (res.status === 401) {
                return {
                    status: 401,
                    message: "Invalid email or password",
                    data: {
                        user: null,
                        token: null,
                    },
                };
            } else {
                // Handle other status codes if necessary
                return {
                    status: res.status,
                    message: res.data?.message || "An error occurred",
                    data: {
                        user: null,
                        token: null,
                    },
                };
            }
        }

        // Handle cases where `res` is undefined or does not have a status
        return {
            status: 400,
            message: "Invalid response format",
            data: {
                user: null,
                token: null,
            },
        };
    } catch (error) {
        return {
            status: 400,
            message: "Error parsing user data",
            data: {
                user: null,
                token: null,
            },
        };
    }
};

// User Update Service
const updateUserDetailsService = async (
    userId,
    userObj
) => {
    try {
        const res = await userDataAccess.updateUserDetails(userId, userObj);

        if (!res || res.status !== 200) {
            return {
                status: res?.status,
                data: {
                    message: res?.data.message,
                },
            };
        }

        if (res.status === 200) {
            return {
                status: 200,
                message: res?.data.message,
                data: {
                    user: res?.data.user,
                },
            };
        }
    } catch (error) {
        return {
            status: 400,
            error: "Error parsing user data",
        };
    }
};

//Become Service
const upgradeUserService = async (
    userId,
    userObj
) => {
    try {
        const res = await userDataAccess.upgradeUser(userId, userObj);
        if (!res || res.status !== 200) {
            return {
                status: res?.status,
                message: res?.data.message,
            };
        }

        if (res.status === 200) {
            return {
                status: 200,
                message: res?.data.message,
                data: {
                    user: res?.data.user,
                },
            };
        }
    } catch (error) {
        return {
            status: 400,
            data: {
                message: "Error parsing user data",
            },
        };
    }
};

//Change Password Service
const changePasswordService = async (
    userId,
    oldPassword,
    newPassword
) => {
    const res = await userDataAccess.changePassword(
        userId,
        oldPassword,
        newPassword
    );

    if (!res) {
        return {
            status: 404,
            error: "User not found",
        };
    }

    if (res.status === 400) {
        return {
            status: 400,
            message: res?.data.message,
        };
    }

    if (res.status === 200) {
        return {
            status: 200,
            message: res?.data.message,
        };
    }
};

//Delete User Service
const deleteUserService = async (userId) => {
    const res = await userDataAccess.deleteUser(userId);
    if (!res || res.status !== 200) {
        return {
            status: 400,
            message: "Error deleting user",
        };
    }

    if (res.status === 200) {
        return {
            status: 200,
            message: res?.data.message,
        };
    }
};

//Get User By Id Service
const getUserByIdService = async (userId) => {
    try {
        const res = await userDataAccess.getUserById(userId);
        if (!res) {
            return {
                status: 400,
                error: {
                    message: "Error getting user",
                },
            };
        }
        if (res) {
            return {
                status: 200,
                message: "User fetched successfully",
                data: res,
            };
        }
    } catch (error) {
        return {
            status: 400,
            data: {
                message: "Error getting user",
            },
        };
    }
};



module.exports = {
    userRegisterService,
    userLoginService,
    updateUserDetailsService,
    changePasswordService,
    deleteUserService,
    upgradeUserService,
    getUserByIdService
};
