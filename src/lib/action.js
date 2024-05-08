"use server";
import z from "zod";
import { connectDb, convertToFile } from "./utils";
import { Employee } from "./models";

const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
let employeeSchema = z.object({
  image: z.string(""),
  name: z
    .string("Please fill this field")
    .min(3, "First name is too short")
    .max(32, "First name is too long"),

  email: z
    .string("Please fill this field")
    .email("Please provide a valid email")
    .min(5, "Value is too short"),
  mobile: z
    .string("Please fill this field")
    .min(10, "Value is too short")
    .min(10, "Value is too long"),
  designation: z.string("Please fill this field").min(2, "Value is too short"),
  gender: z.string("Please fill this field"),
  course: z.string("Please fill this field").min(1, "Course is required"),
});

const loginSchema = z.object({
  username: z
    .string("Please fill this field")
    .min(3, "Value is too short")
    .regex(
      /^[a-zA-Z0-9]+$/,
      "This field cannot contain white space and special character"
    ),
  password: z
    .string("Please fill this field")
    .min(6, "Password is too short")
    .max(15, "Maximum 15 characters"),
});

export async function login(prevState, formData) {
  const credentials = Object.fromEntries(formData);

  return { ...prevState, errors: null };
}
export async function createEmpoyee(prevState, formData) {
  const employee = Object.fromEntries(formData);
  const validateEmpData = employeeSchema.safeParse(employee);

  if (!validateEmpData.success) {
    console.log(validateEmpData.error.flatten().fieldErrors);
    return {
      errors: validateEmpData.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to create employee.",
    };
  }

  try {
    connectDb();
    // Check Existing user
    const existingEmail = await Employee.findOne({
      email: validateEmpData.data.email,
    });
    if (existingEmail) {
      // Matching zod's practice
      return {
        errors: { email: ["Email already exists"] },
        message: "",
      };
    }

    // Avatar Image parsing
    const avatarData = new FormData();
    if (employee.image) {
      const avatar = await convertToFile(employee.image);
      avatarData.append("file", avatar);
      avatarData.append("upload_preset", "upload");
    }

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "post",
        body: avatarData,
      }
    );
    const parsed = await response.json();
    validateEmpData.data.image = parsed.url;
    const newEmployee = new Employee(validateEmpData.data);

    await newEmployee.save();
    return {
      errors: null,
      message: "success",
    };
  } catch (error) {
    // Fix "Error: NEXT_REDIRECT" next.js shows this error if you do any furthur actions like console log after signIn.
    throw error;
  }
}

export async function updateEmpoyee(id, prevState, formData) {
  const employee = Object.fromEntries(formData);
  const validateEmpData = employeeSchema.safeParse(employee);

  if (!validateEmpData.success) {
    console.log(validateEmpData.error.flatten().fieldErrors);
    return {
      errors: validateEmpData.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to create employee.",
    };
  }

  try {
    connectDb();
    // Check Existing user
    const existingEmail = await Employee.findOne({
      email: validateEmpData.data.email,
    });
    if (!existingEmail) {
      // Matching zod's practice
      return {
        errors: { email: ["Email doesn't exist, Create an Employee"] },
        message: "",
      };
    }

    // Avatar Image parsing
    const avatarData = new FormData();
    if (employee.image) {
      const avatar = await convertToFile(employee.image);
      avatarData.append("file", avatar);
      avatarData.append("upload_preset", "upload");
    }

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "post",
        body: avatarData,
      }
    );
    const parsed = await response.json();
    validateEmpData.data.image = parsed.url;
    const updateEmployee = await Employee.findByIdAndUpdate(
      id,
      validateEmpData.data,
      { new: true }
    );

    return {
      errors: null,
      message: "success",
    };
  } catch (error) {
    // Fix "Error: NEXT_REDIRECT" next.js shows this error if you do any furthur actions like console log after signIn.
    throw error;
  }
}
