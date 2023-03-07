import express from 'express';
import { bookDetails, createBokoForm, createBook, deleteBook, getAllBooks, getHomePage, updateBook, updateBookForm } from '../controlers/books/indexc';
import { auth } from '../middleware/auth';
const router = express.Router();

router.use(express.static("public"));

// ROUTER FUNCTIONS

/* GET home page. */
router.get('/', getHomePage)

router.get("/getAllBooks", auth, getAllBooks);
router.post("/bookDetails", bookDetails);

router.get("/createBookF",createBokoForm);
router.post("/createBook", auth, createBook);

router.post("/updateBookdetail", auth, updateBook);
router.post("/updateBook",updateBookForm);

router.post("/deleteBook", deleteBook);



export default router;
