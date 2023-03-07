import express from 'express';
import { createUserData, createUserDataForm, getAUser, getAUserForm } from '../controlers/users/usersc';
import { auth } from '../middleware/auth';


const router = express.Router();

router.use(express.static("public"));

// ROUTER FUNCTIONS
router.get('/getAUsers', auth, getAUserForm);
router.post('/getAUsers', auth, getAUser);

router.post('/createUser',  createUserData);
router.get('/createUser',  createUserDataForm);
/* GET users listing. */


export default router;
