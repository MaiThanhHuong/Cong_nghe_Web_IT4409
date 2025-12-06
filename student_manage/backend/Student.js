import mongoose from "mongoose";

const Schema = mongoose.Schema;

const studentSchema = new Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    class: { type: String, required: true },
  },
  { collection: "students" }
);

const Student = mongoose.model("Student", studentSchema);

export default Student;
