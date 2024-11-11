import React from "react";
import { Container, Row, Col, Form, ListGroup } from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";
import { ToastContainer, toast } from "react-toastify";
import { IoIosAddCircleOutline } from "react-icons/io";
import * as Yup from "yup";
import Task from "../Task/Task";
import { useTodos } from "../../Hooks/Usetodos";
import "react-toastify/dist/ReactToastify.css";
import "./TodoList.css";

const validationSchema = Yup.object().shape({
  task: Yup.string()
    .required("لطفا تسکی را بنویسید")
    .matches(
      /^[a-zA-Z0-9\u0600-\u06FF\s]+$/,
      "تسک باید فقط شامل حروف، اعداد و فواصل باشد"
    )
    .min(3, "تسک باید حداقل 3 کاراکتر باشد"),
});

const TodoList = () => {
  const {
    todos,
    handleAddTodo,
    handleDeleteTodo,
    handleToggleComplete,
    completedCount,
  } = useTodos();

  return (
    <container className="todo-container">
      <ToastContainer />
      <Row className="d-flex justify-content-center align-content-center mt-5">
        <Col md="auto" className=" todolist">
          <h1 className="text-center my-4 subject">کار های روزانه</h1>
          <Formik
            initialValues={{ task: "" }}
            validationSchema={validationSchema}
            onSubmit={handleAddTodo}
          >
            {({ handleSubmit, handleChange, values }) => (
              <Form
                inline="true"
                className="d-flex mb-3 form-style"
                onSubmit={handleSubmit}
              >
                <div className="d-flex flex-column inputadd">
                  <Field
                    type="text"
                    name="task"
                    value={values.task}
                    onChange={handleChange}
                    placeholder="لطفا تسک وارد کنید"
                    className="me-2 input-style form-control"
                  />
                  <ErrorMessage
                    name="task"
                    component="div"
                    className="text-danger mx-2 error"
                  />
                </div>
                <button className="add" type="submit">
                  <IoIosAddCircleOutline className="mx-1 iconadd" />
                </button>
              </Form>
            )}
          </Formik>
          <div className="list-container">
            <ListGroup>
              {todos.map((todo) => (
                <Task
                  key={todo.id}
                  todo={todo}
                  handleToggleComplete={handleToggleComplete}
                  handleDeleteTodo={handleDeleteTodo}
                />
              ))}
              <div className="taskinfo">
                <p className="my-1">
                  <span className="total">تعداد وظایف</span>{" "}
                  <span>:{todos.length}</span>
                </p>
                <p className="my-3">
                  <span className="done ">کار های انجام شده</span>{" "}
                  <span>:{completedCount}</span>
                </p>
              </div>
            </ListGroup>
          </div>
        </Col>
      </Row>
    </container>
  );
};

export default TodoList;
