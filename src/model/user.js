const { z } = require("zod");

// Role Enum
const Role = z.enum(["USER", "ADMIN", "ALUMNI"]); // Adjust according to your roles

// Signup Schema
const signupSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    oAuthId: z.string().optional(),
    provider: z.string().optional(),
    role: Role.optional(), // Default will be handled by your ORM
    isDeleted: z.boolean().optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
});

// Login Schema
const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});

// Update Schema
const updateUserSchema = z.object({
    name: z.string().min(1, "Name is required").optional(),
    phoneNumber: z
        .string()
        .length(10, "Phone number must be exactly 10 digits")
        .regex(/^\d+$/, "Phone number must contain only digits")
        .optional(),
});

module.exports = {
    loginSchema, signupSchema, updateUserSchema
}