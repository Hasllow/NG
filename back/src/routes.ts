import { Router } from "express";
import { CreateTransactionController } from "./controllers/CreateTransactionController";
import { CreateUserController } from "./controllers/CreateUserController";
import { GetTransactionsController } from "./controllers/GetTransactionsController";
import { GetUserController } from "./controllers/GetUserController";
import { LoginController } from "./controllers/LoginController";
import { verifyToken } from "./controllers/VerifyToken";
import { verifyTokenMiddleware } from "./middleware/auth";

const router = Router();

const createUserController = new CreateUserController();
const loginController = new LoginController();
const getTransactionsController = new GetTransactionsController();
const createTransaction = new CreateTransactionController();
const getUserController = new GetUserController();

router.post("/create-user", createUserController.handle);
router.post("/login", loginController.handle);

// router.use("/banking", verifyTokenMiddleware);
router.post("/verify-token", verifyToken);
router.get("/user-info/", verifyTokenMiddleware, getUserController.handle);
router.get("/transactions/", verifyTokenMiddleware, getTransactionsController.handle);
router.post("/transfer", verifyTokenMiddleware, createTransaction.handle);
export { router };
