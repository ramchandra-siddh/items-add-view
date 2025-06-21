import itemModel from "../models/ItemModel.js";
import mongoose from "mongoose";
// import nodemailer from "nodemailer";

export const addItem = async (req, res) => {
  try {
    const { name, type, desc } = req.body;
    const cover = req.files.cover?.[0].path;
    const images = req.files.images?.map((file) => file.path) || [];

    const item = new itemModel({ name, type, desc, cover, images });
    await item.save();

    res.status(201).json({ success: true, message: "Item successfully added" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to add item" });
  }
};

export const getItems = async (req, res) => {
  try {
    const items = await itemModel.find();
    res.json({ success: true, items });
  } catch {
    res.status(500).json({ success: false, message: "Failed to fetch items" });
  }
};

export const sendEnquiry = async (req, res) => {
  const { itemId, userEmail } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({ error: "Invalid itemId" });
    }

    const item = await itemModel.findById(itemId);
    if (!item) return res.status(404).json({ error: "Item not found" });

    return res.json({ message: "Test success response" });

    // const transporter = nodemailer.createTransport({
    //   service: "gmail",
    //   auth: {
    //     user: process.env.EMAIL_USER,
    //     pass: process.env.EMAIL_PASS,
    //   },
    // });

    // await transporter.sendMail({
    //   from: process.env.EMAIL_USER,
    //   to: "static@email.com",
    //   subject: "New Enquiry",
    //   text: `Enquiry for item: ${item.name} (${item.type}) from ${userEmail}`,
    // });

    // res.json({ message: "Enquiry sent successfully" });
  } catch {
    res.status(500).json({ error: "Failed to send enquiry" });
  }
};
