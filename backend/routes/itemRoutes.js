import express from "express";
import multer from "multer";
import {
  addItem,
  getItems,
  sendEnquiry,
} from "../controllers/itemController.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (_, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

router.post(
  "/items",
  upload.fields([{ name: "cover" }, { name: "images" }]),
  addItem
);
router.get("/items", getItems);
router.post("/enquire", sendEnquiry);

export default router;
