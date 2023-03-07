import { z } from "zod";

export const createUserZod = z.object({
	UserName: z
		.string({
			required_error: "User Name name is required",
		})
		.min(5, { message: "User Name name must be 5 or more characters long" }),
	email: z.string({ required_error: "Email is required" }).email(),
	password: z
		.string({
			required_error: "Password is required",
		})
		.min(8, { message: "Password must be 8 or more characters long" }),
});

export const loginUserZod = z.object({
	UserName: z
		.string({
			required_error: "User Name name is required",
		})
		.min(5, { message: "User Name name must be 5 or more characters long" }),
	password: z
		.string({
			required_error: "Password is required",
		})
		.min(8, { message: "Password must be 8 or more characters long" }),
});
