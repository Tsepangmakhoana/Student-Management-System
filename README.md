# Student Management System

DIWA2110 individual assignment. A React app to view, add, edit and delete student records using modal dialogs.

**Live app:** (add your Netlify/Vercel URL here)

## Run locally
```bash
npm install
npm run dev
```
Build for production: `npm run build`

## Features
- Dashboard table (cards on mobile) with ID, full name, age, email, course and enrollment status
- Add and edit in one form modal, delete with a confirmation modal
- Validation: required fields, age 15–80, email format, duplicate email check
- Search by name, ID or course; empty-state messages
- Data saved in localStorage, so it survives a refresh

## Project structure
```
src/
  App.jsx                      main component, state and handlers
  components/                  Modal, StudentFormModal, DeleteConfirmModal, StudentTable
  hooks/useLocalStorage.js     state saved to the browser
  utils/validation.js          rules and option lists
  utils/studentHelpers.js      add / update / delete / search functions
```

## Data types and declarations
- **string**: id, fullName, email, course, status
- **number**: age (form input is converted with `Number()`)
- **boolean**: `isActive`, derived from status
- **array**: the list of students; **object**: each student and the form `errors`
- **const**: values and functions that are never reassigned (most of the code)
- **let / var**: `var highest` in `generateStudentId` is function-scoped and reassigned in a loop; use `let` for block-scoped values that change

## Testing checklist
| Test | Result |
|---|---|
| Add a valid student, it appears at once | |
| Edit a student, changes appear at once | |
| Delete with confirmation | |
| Cancel on every modal changes nothing | |
| Empty name / bad email / age 10 show errors and block saving | |
| Duplicate email is rejected | |
| Delete all students shows the empty state | |
| Refresh keeps the data | |
| Layout works on a phone-width screen | |

Fill the Result column with Pass/Fail after you test it yourself.
