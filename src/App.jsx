import React from "react";
import TodoList from "./Components/Todolist/Todolist";
import ErrorBoundary from "./Helper/ErrorHandle/Error";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <ErrorBoundary>
      <ToastContainer />
      <TodoList />
    </ErrorBoundary>
  );
}

export default App;
