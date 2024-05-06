import express from "express";
import { addUser, blockUser, makeAdmin, test, userlist } from "../controllers/adminController.js";

const router= express.Router();

router.get('/test', test)
router.get('/userlist', userlist)
router.post('/makeadmin/:id',makeAdmin)
router.post('/block/:id', blockUser)
router.post('/addUser', addUser)


export default router;