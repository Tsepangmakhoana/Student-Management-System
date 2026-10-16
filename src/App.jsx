import { useState } from "react";
import StudentTable from "./components/StudentTable.jsx";
import StudentFormModal from "./components/StudentFormModal.jsx";
import DeleteConfirmModal from "./components/DeleteConfirmModal.jsx";
import useLocalStorage from "./hooks/useLocalStorage.js";
import {
  SEED_STUDENTS,
  generateStudentId,
  toStudentRecord,
  addStudent,
  updateStudent,
  deleteStudent,
  searchStudents,
} from "./utils/studentHelpers.js";

export default function App() {
  // State: the list of students (saved in localStorage), search text, and which modal is open.
  const [students, setStudents] = useLocalStorage("sms-students", SEED_STUDENTS);
  const [searchTerm, setSearchTerm] = useState("");
  // modal = { type: "add" | "edit" | "delete", student: object | null } or null when closed
  const [modal, setModal] = useState(null);

  const closeModal = () => setModal(null);

  const handleSave = (values) => {
    if (modal.type === "edit") {
      const record = toStudentRecord(values, modal.student.id);
      setStudents((current) => updateStudent(current, record));
    } else {
      const record = toStudentRecord(values, generateStudentId(students));
      setStudents((current) => addStudent(current, record));
    }
    closeModal();
  };

  const handleDelete = (id) => {
    setStudents((current) => deleteStudent(current, id));
    closeModal();
  };

  const visibleStudents = searchStudents(students, searchTerm);
  const enrolledCount = students.filter((s) => s.isActive).length;

  return (
    <div className="app">
      <header className="app-header">
        <div>
          <h1>Student records</h1>
          <p className="summary">
            {students.length} students · {enrolledCount} currently enrolled
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => setModal({ type: "add", student: null })}>
          Add student
        </button>
      </header>

      <input
        className="search"
        type="search"
        placeholder="Search by name, ID or course"
        aria-label="Search students"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />

      <main>
        <StudentTable
          students={visibleStudents}
          isFiltered={searchTerm.trim() !== ""}
          onEdit={(student) => setModal({ type: "edit", student })}
          onDelete={(student) => setModal({ type: "delete", student })}
        />
      </main>

      {(modal?.type === "add" || modal?.type === "edit") && (
        <StudentFormModal
          student={modal.student}
          students={students}
          onSave={handleSave}
          onClose={closeModal}
        />
      )}
      {modal?.type === "delete" && (
        <DeleteConfirmModal student={modal.student} onConfirm={handleDelete} onClose={closeModal} />
      )}
    </div>
  );
}
