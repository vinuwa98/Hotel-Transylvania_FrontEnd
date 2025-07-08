import * as yup from "yup";

const userUpdateSchema = yup.object({
  email: yup.string().email("Please enter a valid email address"),
  firstName: yup
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name cannot exceed 50 characters")
    .matches(/^[a-zA-Z\s]+$/, "First name can only contain letters and spaces"),

  lastName: yup
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name cannot exceed 50 characters")
    .matches(/^[a-zA-Z\s]+$/, "Last name can only contain letters and spaces"),

  dob: yup
    .date()
    .max(new Date(), "Date of birth cannot be in the future")
    .test("age", "User must be at least 18 years old", function (value) {
      if (!value) return true;
      const today = new Date();
      const birthDate = new Date(value);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }

      return age >= 18;
    }),

  address: yup
    .string()
    .min(10, "Address must be at least 10 characters")
    .max(200, "Address cannot exceed 200 characters"),

  role: yup
    .string()
    .required("Role is required")
    .oneOf(
      [
        "Cleaner",
        "HelpDesk",
        "Supervisor",
        "MaintenanceStaff",
        "MaintenanceManager",
      ],
      "Please select a valid role"
    ),

  supervisorID: yup.string().when("role", {
    is: "Cleaner",
    then: (schema) =>
      schema.required("Supervisor ID is required for Cleaner role"),
    otherwise: (schema) => schema.notRequired(),
  }),

  contactNumber: yup
    .string()
    .matches(/^\+?[1-9]\d{1,14}$/, "Please enter a valid phone number")
    .min(10, "Contact number must be at least 10 digits")
    .max(15, "Contact number cannot exceed 15 digits"),
});

export default userUpdateSchema;
