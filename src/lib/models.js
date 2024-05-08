import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const employeeSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    designation: { type: String, required: true },
    course: { type: String, required: true },
    gender: { type: String, required: true },
    image: { type: String },
  },
  { timestamps: true }
);

export const Admin =
  mongoose?.models?.Admin || mongoose.model("Admin", adminSchema);
export const Employee =
  mongoose?.models?.Employee || mongoose.model("Employee", employeeSchema);
