import { Router } from "express";
import { updateUser } from "../controllers/user.controller";
import { isAuth } from "../middleware/isAuth.middleware";
const router = Router();


router.put('/user/update/:userId', isAuth, updateUser);
router.delete('/user/delete', (req, res) => {});
router.put('/user/create-pin', (req,res) => {});
export default router;