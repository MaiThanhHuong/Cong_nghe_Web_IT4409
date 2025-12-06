import express from "express";
import cors from "cors";
import mongoose from "mongoose";

// Tạo app Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Kết nối MongoDB
mongoose
  .connect("mongodb://localhost:27017/student_db")
  .then(() => console.log("Đã kết nối MongoDB thành công"))
  .catch((err) => console.error("Lỗi kết nối MongoDB:", err));

import Student from "./Student.js";

// Test route
app.get("/", (req, res) => {
  res.send("Backend server is running!");
});

// API GET danh sách học sinh
app.get("/api/students", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API POST thêm học sinh mới
app.post("/api/students", async (req, res) => {
  try {
    const newStudent = await Student.create(req.body);
    res.status(201).json(newStudent);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// API PUT cập nhật thông tin học sinh
app.put("/api/students/:id", async (req, res) => {
  try {
    const updatedStu = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedStu) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.json(updatedStu);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE: Xóa học sinh theo ID
app.delete("/api/students/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Student.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.json({ message: "Đã xóa học sinh", id: deleted._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Chạy server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server chạy tại http://localhost:${PORT}`);
});
