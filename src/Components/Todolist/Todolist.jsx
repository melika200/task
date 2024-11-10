import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, ListGroup, ListGroupItem } from "react-bootstrap";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaTrashAlt } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "react-toastify/dist/ReactToastify.css";
import "./Todolist.css";

// Validation schema
const validationSchema = Yup.object().shape({
  task: Yup.string()
    .required("لطفا تسکی را بنویسید")
    .matches(/^[a-zA-Z0-9\u0600-\u06FF\s]+$/, "تسک باید فقط شامل حروف، اعداد و فواصل باشد")
    .min(3, "تسک باید حداقل 3 کاراکتر باشد")
});

const TodoList = () => {
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem("todos")) || []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = (values, { resetForm }) => {
    const newTodo = { text: values.task.trim(), completed: false };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
    resetForm();
    toast.success("تسک اضافه شد");
  };

  const handleDeleteTodo = (index) => {
    toast.info("تسک در حال حذف شدن هست");
    setTodos((prevTodos) => prevTodos.filter((_, i) => i !== index));
    toast.success("حذف شد");
  };

  const handleToggleComplete = (index) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo, i) =>
        i === index ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const completedCount = todos.filter((todo) => todo.completed).length;

  return (
    <Container className="todo-container">
      <ToastContainer />
      <Row className="justify-content-md-center">
        <Col md="auto">
          <h1 className="text-center my-4 subject">کار های روزانه</h1>
          <Formik
            initialValues={{ task: "" }}
            validationSchema={validationSchema}
            onSubmit={handleAddTodo}
          >
            {({ handleSubmit, handleChange, values }) => (
              <Form inline="true" className="d-flex mb-3 form-style" onSubmit={handleSubmit}>
                <Field
                  type="text"
                  name="task"
                  value={values.task}
                  onChange={handleChange}
                  placeholder="لطفا تسک وارد کنید"
                  className="me-2 input-style form-control"
                />
                <ErrorMessage name="task" component="div" className="text-danger mx-2" />
                <button className="add" type="submit">
                  <IoIosAddCircleOutline className="mx-1 iconadd" />
                </button>
              </Form>
            )}
          </Formik>
          <div className="list-container">
            <ListGroup>
              {todos.map((todo, index) => (
                <div className="d-flex flex-row align-items-center" key={index}>
                  <ListGroupItem
                    className={`d-flex mx-1 justify-content-between align-items-center rounded list-item ${
                      todo.completed ? "completed" : ""
                    }`}
                  >
                    <div
                      onClick={() => handleToggleComplete(index)}
                      className={`square-checkbox ${
                        todo.completed ? "checked" : ""
                      }`}
                    >
                      {todo.completed ? "✔️" : ""}
                    </div>
                    <div className="d-flex align-items-center">
                      <span
                        className={`ms-2 ${
                          todo.completed ? "text-decoration-line-through" : ""
                        }`}
                      >
                        {todo.text}
                      </span>
                    </div>
                  </ListGroupItem>

                  <span
                    className="mx-1 taskicon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteTodo(index);
                    }}
                  >
                    <FaTrashAlt className="mx-1" />
                  </span>
                </div>
              ))}
              <p className="my-1"><span className="total">تعداد وظایف:</span> <span>{todos.length}</span></p>
              <p className="my-1"><span className="done ">کار های انجام شده:</span> <span>{completedCount}</span></p>
            </ListGroup>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default TodoList;
