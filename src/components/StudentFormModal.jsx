import { useState } from "react";
import Modal from "./Modal.jsx";
import { COURSES, STATUSES, validateStudent } from "../utils/validation.js";

// Used for BOTH adding and editing. `student` is null when adding.
export default function StudentFormModal({ student, students, onSave, onClose }) {
  const isEditing = student !== null;

  const [values, setValues] = useState({
    fullName: student?.fullName ?? "",
    age: student ? String(student.age) : "", // inputs hold strings
    email: student?.email ?? "",
    course: student?.course ?? "",
    status: student?.status ?? "Enrolled",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const foundErrors = validateStudent(values, students, student?.id ?? null);
    setErrors(foundErrors);
    if (Object.keys(foundErrors).length > 0) return; // block invalid submissions
    onSave(values);
  };

  // Small helper so each field is written once.
  const renderError = (field) =>
    errors[field] ? <p className="field-error" role="alert">{errors[field]}</p> : null;

  return (
    <Modal title={isEditing ? "Edit student" : "Add student"} onClose={onClose}>
      <form onSubmit={handleSubmit} noValidate>
        {isEditing && (
          <p className="student-id">Student ID: <strong>{student.id}</strong></p>
        )}

        <label htmlFor="fullName">Full name</label>
        <input id="fullName" name="fullName" value={values.fullName} onChange={handleChange} autoFocus />
        {renderError("fullName")}

        <label htmlFor="age">Age</label>
        <input id="age" name="age" type="number" value={values.age} onChange={handleChange} />
        {renderError("age")}

        <label htmlFor="email">Email address</label>
        <input id="email" name="email" type="email" value={values.email} onChange={handleChange} />
        {renderError("email")}

        <label htmlFor="course">Course of study</label>
        <select id="course" name="course" value={values.course} onChange={handleChange}>
          <option value="">Select a course</option>
          {COURSES.map((course) => (
            <option key={course} value={course}>{course}</option>
          ))}
        </select>
        {renderError("course")}

        <label htmlFor="status">Enrollment status</label>
        <select id="status" name="status" value={values.status} onChange={handleChange}>
          {STATUSES.map((status) => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
        {renderError("status")}

        <div className="modal-actions">
          <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn btn-primary">
            {isEditing ? "Save changes" : "Add student"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
