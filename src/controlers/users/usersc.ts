import express, { NextFunction, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { creatData, getAllData } from "../../utils/users/indexU";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../models/userModel";
import { createUserZod, loginUserZod } from "../../utils/validationZod/users";

// C-O-N-T-R-O-L-E-R FUNCTION
//
const path = require("path");
const saltRounds = 10;

//FUNCTION FOR GET ALL USERS COMING FROM THE getAllData Function IN UTILITY
// GET REQUEST FOR WHEN USER LOGS IN
export const getAUserForm = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	res.render("login");
};
export const getAUser = async (req: Request, res: Response) => {
	const userData = req.body;
  const error: any = loginUserZod.safeParse(userData);

	if (error.success === false) {
		return res.status(400).send({
			status: "error",
			path: req.url,
			message: error.error.issues[0].message,
		});
	}
		const name = req.body.UserName;
		const user = await User.findOne({ UserName: name });
	try {
		
		
		if (!user) {
			return res
				.status(200)
				.send({ message: "User not found", success: false , user});
			// checking if the user is in the database
		}

		const { password } = req.body;

		const result = await bcrypt.compareSync(password, user.password);
		if (result) {
			const jwtSecret = process.env.JWT_SECRET;
			if (!jwtSecret) {
				throw new Error("JWT_SECRET is not defined");
			}
			const token = jwt.sign({ id: user._id }, jwtSecret, {
				expiresIn: "1d",
			});

			// res.redirect("/book/getAllBooks");
			res.status(201).send({
				status: "Login success",
				path: req.url,
				data: user,
				token,
			});
		} else {
			return res
				.status(200)
				.send({ message: "Password is incorrect", success: false });
		}
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.send({ message: "Something went wrong", success: false, error });
	}
};

//FUNCTION FOR CREATING users COMING FROM THE creatData Function IN UTILITY

export const createUserDataForm = (req: Request, res: Response) => {
	res.render("signup");
};
export const createUserData = async (req: Request, res: Response) => {
	const userData = req.body;

	const error: any = createUserZod.safeParse(userData);
	try {

if (error.success === false) {
	return res.status(400).send({
		success: false,
		path: req.url,
		message: error.error.issues[0].message,
	});
}

		const userExists = await User.findOne({
			UserName: req.body.UserName,
		});
		if (userExists) {
			return res
				.status(200)
				.send({ message: "User already exists", success: false });
			// To check if their is a user with the same email already
		}

		const { password, UserName, email } = req.body;

		const salt = await bcrypt.genSaltSync(saltRounds);
		const hash = await bcrypt.hashSync(password, salt);
		const newChunk = {
			UserName: UserName,
			email: email,
			password: hash,
		};

		const newuser = new User(newChunk);
		// const token = jwt.sign(newuser, "shhhhh", {expiresIn: "1d"});
		console.log( newuser);
		await newuser.save();
		
		// console.log(token, newuser);

					res.status(201).send({
						status: "success",
						path: req.url,
						message: `New user with email - ${newuser.email} added successfully`,
						data: newuser,
						// token: token,
					});

		// res.redirect("/book/getAllBooks");
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Something went wrong", success: false });
	}
};
