// src/hooks/useTodos.js
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";

export const useTodos = () => {
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem("todos")) || []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = async (values, { resetForm }) => {
    try {
      const newTodo = { id: uuidv4(), text: values.task.trim(), completed: false };
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      resetForm();
      await Swal.fire({
        icon: "success",
        title: "تسک اضافه شد",
        confirmButtonText: "باشه",
      });
    } catch (error) {
      toast.error("خطا در اضافه کردن تسک. لطفا دوباره تلاش کنید.");
      console.error("Error adding todo:", error);
    }
  };

  const handleDeleteTodo = (id) => {
    Swal.fire({
      title: "آیا مطمئن هستید؟",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "بله، حذف کن!",
      cancelButtonText: "خیر، برگرد",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          toast.info("در حال حذف تسک", {
            autoClose: 1000,
            onClose: async () => {
              setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
              await Swal.fire("حذف شد!", "تسک با موفقیت حذف شد.", "success");
            },
          });
        } catch (error) {
          toast.error("خطا در حذف تسک. لطفا دوباره تلاش کنید.");
          console.error("Error deleting todo:", error);
        }
      }
    });
  };
  

  const handleToggleComplete = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
    );
  };

  const completedCount = todos.filter((todo) => todo.completed).length;

  return {
    todos,
    handleAddTodo,
    handleDeleteTodo,
    handleToggleComplete,
    completedCount,
  };
};
