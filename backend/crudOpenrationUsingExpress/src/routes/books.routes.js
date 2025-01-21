import { Router } from "express";
import {
  addBooks,
  deleteBookEntry,
  getAllBooks,
  getDetailsByObjectId,
  updateBookField,
} from "../controllers/books.controllers.js";

const router = Router();

router.route("/getAllBooks").get(getAllBooks);
router.route("/addbooks").post(addBooks);
router.route("/updateBook/:id").put(updateBookField);
router.route("/deleteBook/:id").delete(deleteBookEntry);
router.route("/bookDetails/:id").get(getDetailsByObjectId);

export default router;
