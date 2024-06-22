import { Router } from "express";
import { signUp , signIn } from "../controllers/auth.controller";
import validateSchema from "../middleware/validationFactory.middleware";
import { LoginSchema, SignUpSchema } from "../validationSchemas/user.schema";
const router = Router();

router.post("/signup", validateSchema(SignUpSchema), signUp);
router.post("/signin", validateSchema(LoginSchema), signIn);

export default router;
