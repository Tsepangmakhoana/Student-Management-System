// Table on desktop; the CSS turns each row into a card on small screens.
export default function StudentTable({ students, onEdit, onDelete, isFiltered }) {
  if (students.length === 0) {
    return (
      <div className="empty-state">
        <p>
          {isFiltered
            ? "No students match your search."
            : "No students yet. Choose “Add student” to create the first record."}
        </p>
      </div>
    );
  }

  return (
    <table className="student-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Full name</th>
          <th>Age</th>
          <th>Email</th>
          <th>Course</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <tr key={student.id}>
            <td data-label="ID">{student.id}</td>
            <td data-label="Name">{student.fullName}</td>
            <td data-label="Age">{student.age}</td>
            <td data-label="Email">{student.email}</td>
            <td data-label="Course">{student.course}</td>
            <td data-label="Status">
              <span className={`badge ${student.isActive ? "badge-active" : "badge-inactive"}`}>
                {student.status}
              </span>
            </td>
            <td data-label="Actions" className="row-actions">
              <button className="btn btn-small btn-secondary" onClick={() => onEdit(student)}>
                Edit
              </button>
              <button className="btn btn-small btn-danger-outline" onClick={() => onDelete(student)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
