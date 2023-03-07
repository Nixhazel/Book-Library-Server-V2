import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
    {
        UserId:{
            type: ObjectId,
            required: true,
        },
		Title: {
			type: String,
			required: true,
		},
		Author: {
			type: String,
			required: true,
		},
		datePublished: {
			type: String,
			required: true,
		},
		Description: {
			type: String,
			required: true,
		},
		pageCount: {
			type: Number,
			required: true,
		},
		Genre: {
			type: String,
			required: true,
		},
		publisher: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const bookModel = mongoose.model("books", bookSchema);

export default bookModel;
