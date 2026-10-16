// Validation rules and shared option lists.

// const: these values never get reassigned, so const protects them from accidental changes.
export const COURSES = [
  "Software Engineering",
  "Business Information Technology",
  "Information Technology",
  "Multimedia Technology",
  "Networking",
];

export const STATUSES = ["Enrolled", "Graduated", "Withdrawn"];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Checks form values and returns an errors object.
 * An empty object means the form is valid.
 * @param {object} values     raw form values (all strings)
 * @param {Array}  students   current students (used for duplicate email check)
 * @param {string|null} editingId  id of the student being edited, or null when adding
 */
export const validateStudent = (values, students, editingId = null) => {
  const errors = {}; // object: field name -> message

  const name = values.fullName.trim();
  if (name === "") {
    errors.fullName = "Enter the student's full name.";
  } else if (name.length < 2) {
    errors.fullName = "Full name must be at least 2 characters.";
  }

  // Form inputs always give strings, so convert to a number before checking.
  const age = Number(values.age);
  if (values.age.trim() === "") {
    errors.age = "Enter the student's age.";
  } else if (!Number.isInteger(age) || age < 15 || age > 80) {
    errors.age = "Age must be a whole number between 15 and 80.";
  }

  const email = values.email.trim().toLowerCase();
  if (email === "") {
    errors.email = "Enter an email address.";
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = "Enter a valid email, like name@example.com.";
  } else if (students.some((s) => s.email === email && s.id !== editingId)) {
    errors.email = "Another student already uses this email.";
  }

  if (!values.course) errors.course = "Choose a course of study.";
  if (!values.status) errors.status = "Choose an enrollment status.";

  return errors;
};
