import { NextFunction, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { creatData, getAllData, verifyToken } from "../../utils/users/indexU";
import Books from "../../models/bookModel";
import jwt, { JwtPayload } from "jsonwebtoken";
import { bookSchema } from "../../utils/validationZod/books";

// C-O-N-T-R-O-L-E-R FUNCTION
//
//HOME PAGE

export const getHomePage = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	res.render("landingpage");
};

//FUNCTION FOR GET ALL BOOKS COMING FROM THE getAllData Function IN UTILITY
export const getAllBooks = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const page: any = req.query.p || 0
	const booksPerPage = 3
	try {
		const allBooks = await Books.find().skip(page * booksPerPage).limit(booksPerPage);
		if (!allBooks) {
			return res
				.status(200)
				.send({ message: "Books not found", success: false });
			// checking if the user is in the database
    }

		// res.render("home", { checkings: allBooks });
    res
			.status(201)
			.send({ message: "Books  found", success: true, Books: allBooks });
	} catch (error) {
		res
			.status(500)
			.send({ message: "Something went wrong could not get all books", success: false, error });
	}
};

export const bookDetails = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		// const allBooks = await Books.find();
    const id = req.body.bookID;
    const currentBook = await Books.findOne({_id: id})
		// const currentBook = allBooks.find((book: any) => book._id === id);
		// res.render("videtails", { book: currentBook });
		res
			.status(201)
			.send({ message: "Books  found", success: true, Books: currentBook });
		
	} catch (error) {
		res
			.status(500)
			.send({ message: "Something went wrong could not get book details", success: false, error });
	}
};

//FUNCTION FOR CREATING BOOKS COMING FROM THE creatData Function UTILITY
export const createBokoForm =  (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	res.render("createUser");
};

export const createBook = async (req: Request, res: Response, next: NextFunction) => {
const bookData = req.body;

const error = bookSchema.safeParse(bookData);

  const authorization: any = req.headers.authorization;
	const token = authorization.split(" ")[1];

	const decoded = (await verifyToken(token)) as JwtPayload;
	try {
	  if (error.success === false) {
			return res.status(400).send({
				success: false,
				path: req.url,
				message: error.error.issues[0].message,
			});
		}
    // const allBooks = await Books.find();

		const {
			Title,
			Author,
			datePublished,
			Description,
			pageCount,
			Genre,
			publisher,
    } = req.body;
    
    const existingBook = await Books.findOne({ Title: Title });
    console.log("Existing book",existingBook);

		if (existingBook) {
			return res.send({
				message: `Book with the title ${Title} already exists`,
			});
    }
    const newChunk = {
      UserId: decoded.id,
			Title: Title,
			Author: Author,
			datePublished: datePublished,
			Description: Description,
			pageCount: pageCount,
			Genre: Genre,
			publisher: publisher,
		};
    
    let newbook = new Books(newChunk);
 
    await newbook.save();
    // res.redirect("/book/getAllBooks");
    res.status(201).send({
			status: "success",
			path: req.url,
			message: `Book with title - '${newbook.Title}' added successfully`,
			data: newbook,
		});
    
  } catch (error) {
    console.log("Error ",error);
    res
			.status(500)
			.send({ message: "Something went wrong could not create book", success: false, error });
  }
	
};

//FUNCTION FOR UPDATING BOOKS COMING FROM THE creatData Function IN UTILITY

export const updateBookForm = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const id = req.body.bookID;
	const currentBook = await Books.findOne({ _id: id });
	// console.log(currentBook);
	res.render("edithUser", { book: currentBook });
};

export const updateBook = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const allBooks = await Books.find();
		const id = req.body.bookID;
		// console.log(req.body);
		const existingBook = await Books.findOne({ _id: id });
		console.log({ existingBook, allBooks, id });
		if (!existingBook) {
			return res.status(500).send({
				message: `Book with the ID ${id} dose not exists`,
			});
    }
    await Books.findOneAndUpdate({ _id: id }, req.body);
    res.status(201).send({status: "success", path: req.url, message: "Book updated"})
		// res.redirect("/book/getAllBooks");
	} catch (error) {
    console.log("UpdateBookError", error);
    res
			.status(500)
			.send({
				message: "Something went wrong could not update book",
				success: false,
				error,
			});
	}
};

//FUNCTION FOR DELETING BOOKS COMING FROM THE creatData Function IN UTILITY

export const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
try {
		const allBooks = await Books.find();
		const id = req.body.bookID;

		const existingBook = await Books.findOne({ _id: id });
		if (!existingBook) {
			return res.send({
				message: `Book with the ID ${id} dose not exists`,
			});
		}

		await Books.deleteOne(
			{ _id: id }
		);

		// const filteredBooks = allBooks.filter((e: any) => e.id !== id);

		// creatData("books.json", filteredBooks);
		res.redirect("/book/getAllBooks");
	} catch (error) {
        res.status(500).send({
					message: "Something went wrong could not delete book",
					success: false,
					error,
				});
  }
	
};

