import { usercollection } from "../models/user_model.js";
import validationResult from "express-validator";


export const createuser = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const user = await usercollection.create({ name, email, phone });
    res.json({ status: 200, message: "user created succesfully", user });
  } catch (err) {
    res.json({ status: 500, message: err.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    let { search = "", page = 1, limit = 5 } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    const query = {
      status: true,
      $or: [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
      ],
    };

    const total = await usercollection.countDocuments(query);

    const users = await usercollection
      .find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ created_date: -1 });

    res.json({
      totalRecords: total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      users,
    });
  } catch (err) {
    return res.json({ status: 500, message: err.message });
  }
};

export const updateUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  try {
    const now = new Date().toISOString();

    const user = await usercollection.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updated_date: now },
      { new: true },
    );

    res.json({ message: "User updated successfully", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const softDeleteUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, { status: false });
    res.json({ message: "User soft deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const multipleDelete = async (req, res) => {
  try {
    const { ids } = req.body;

    await usercollection.updateMany(
      { _id: { $in: ids } },
      { $set: { status: false } },
    );

    res.json({ message: "Multiple users soft deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
