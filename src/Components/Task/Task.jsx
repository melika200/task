import React from "react";
import { ListGroupItem } from "react-bootstrap";
import { FaTrashAlt } from "react-icons/fa";
import "../Todolist/Todolist.css";
const getTextDirection = (text) => {
  const persianRegex = /^[\u0600-\u06FF]/;
  return persianRegex.test(text[0]) ? "rtl" : "ltr";
};

const Task = ({ todo, handleToggleComplete, handleDeleteTodo }) => (
  <div className="d-flex flex-row align-items-center" key={todo.id}>
    <ListGroupItem
      className={`d-flex mx-1 justify-content-between align-items-center rounded list-item ${
        todo.completed ? "completed" : ""
      }`}
    >
      <div
        onClick={() => handleToggleComplete(todo.id)}
        className={`square-checkbox ${todo.completed ? "checked" : ""}`}
      >
        {todo.completed ? "✔️" : ""}
      </div>
      <div className="d-flex align-items-center">
        <span
          className={`ms-2 ${
            todo.completed ? "text-decoration-line-through" : ""
          }`}
          dir={getTextDirection(todo.text)}
        >
          {todo.text}
        </span>
      </div>
    </ListGroupItem>
    <span
      className="mx-1 taskicon"
      onClick={(e) => {
        e.stopPropagation();
        handleDeleteTodo(todo.id);
      }}
    >
      <FaTrashAlt className="mx-1" />
    </span>
  </div>
);

export default Task;
