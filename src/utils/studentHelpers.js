// Reusable functions for student records.
// Each function returns a NEW array instead of changing the old one,
// because React state must be replaced, not mutated.

export function generateStudentId(students) {
  // var: function-scoped on purpose, to demonstrate it. It is only needed inside this function.
  var highest = 0;
  students.forEach((s) => {
    const number = parseInt(s.id.replace("STU-", ""), 10);
    if (number > highest) highest = number; // reassigned, so it cannot be const
  });
  return `STU-${String(highest + 1).padStart(3, "0")}`;
}

// Turns raw form strings into a correctly typed student record.
export const toStudentRecord = (values, id) => ({
  id, // string
  fullName: values.fullName.trim(), // string
  age: Number(values.age), // number
  email: values.email.trim().toLowerCase(), // string
  course: values.course, // string
  status: values.status, // string
  isActive: values.status === "Enrolled", // boolean, derived from status
});

export const addStudent = (students, record) => [...students, record];

export const updateStudent = (students, record) =>
  students.map((s) => (s.id === record.id ? record : s));

export const deleteStudent = (students, id) =>
  students.filter((s) => s.id !== id);

export const searchStudents = (students, term) => {
  const query = term.trim().toLowerCase();
  if (query === "") return students;
  return students.filter(
    (s) =>
      s.fullName.toLowerCase().includes(query) ||
      s.id.toLowerCase().includes(query) ||
      s.course.toLowerCase().includes(query)
  );
};

export const SEED_STUDENTS = [
  { id: "STU-001", fullName: "Thabo Mokoena", age: 21, email: "thabo.mokoena@example.com", course: "Software Engineering", status: "Enrolled", isActive: true },
  { id: "STU-002", fullName: "Lerato Mohapi", age: 20, email: "lerato.mohapi@example.com", course: "Business Information Technology", status: "Enrolled", isActive: true },
  { id: "STU-003", fullName: "Palesa Nthane", age: 23, email: "palesa.nthane@example.com", course: "Networking", status: "Graduated", isActive: false },
];
