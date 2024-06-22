import { Router } from "express";
import { signUp , signIn } from "../controllers/auth.controller";
import validateSchema from "../middleware/validationFactory.middleware";
import { LoginSchema, SignupSchema } from "../validationSchemas/user.schema";
const router = Router();

router.post("/signup",  signUp);
router.post("/signin", validateSchema(LoginSchema), signIn);

export default router;
