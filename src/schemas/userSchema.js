import * as yup from "yup";

const userSchema = yup.object({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required"),

  firstName: yup
    .string()
    .required("First name is required")
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
      if (!value) return true; // Allow empty values if not required
      const today = new Date();
      const birthDate = new Date(value);
      var age = today.getFullYear() - birthDate.getFullYear();
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
    .required("Address is required")
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
      schema
        .required("Supervisor ID is required for Cleaner role")
        .matches(
          /^[A-Z0-9]{6,10}$/,
          "Supervisor ID must be 6-10 characters (letters and numbers only)"
        ),
    otherwise: (schema) => schema.notRequired(),
  }),

  contactNumber: yup
    .string()
    .matches(/^\+?[1-9]\d{1,14}$/, "Please enter a valid phone number")
    .min(10, "Contact number must be at least 10 digits")
    .max(15, "Contact number cannot exceed 15 digits"),

  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
});

export default userSchema;
