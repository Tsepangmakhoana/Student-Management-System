# Student Management System
 A React app to view, add, edit and delete student records using modal dialogs.


// Features
- Dashboard table (cards on mobile) with ID, full name, age, email, course and enrollment status
- Add and edit in one form modal, delete with a confirmation modal
- Validation: required fields, age 15–80, email format, duplicate email check
- Search by name, ID or course; empty-state messages
- Data saved in localStorage, so it survives a refresh

The structure

src/
  App.jsx                      main component, state and handlers
  components/                  Modal, StudentFormModal, DeleteConfirmModal, StudentTable
  hooks/useLocalStorage.js     state saved to the browser
  utils/validation.js          rules and option lists
  utils/studentHelpers.js      add / update / delete / search functions


// Data types and declarations
- string: id, fullName, email, course, status
- number: age (form input is converted with "Number()")
- boolean: "isActive", derived from status
- array: the list of students; "object": each student and the form "errors"
- const: values and functions that are never reassigned (most of the code)
- let / var: "var highest" in "generateStudentId" is function-scoped and reassigned in a loop; use "let" for block-scoped values that change


