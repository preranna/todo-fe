"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Checkbox, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { AddTodo } from "./add-todo";
import { UpdateTodo } from "./Update-todo";

export default function TodoPage() {
  const [todoList, setTodoList] = useState([]);
  let [currentTodo, setCurrentTodo] = useState(null);  // State for current todo to edit
  let [isOpen, setIsOpen] = useState(false);
  let [isEditOpen, setIsEditOpen] = useState(false);

  const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:1234/todos");
        setTodoList(response.data);
      } catch (err) {
        console.error(err);
        alert("some error occured while fetching data");
      }
    };
  useEffect(() => {
    fetchData();
  }, []);

  // const handleCheck = (todoItem) => {
  //   axios.put(`http://localhost:1234/todos/${todoItem._id}`, {
  //     name: todoItem.name,
  //     completed: !todoItem.completed,
  //   }).then(() => {
  //     const newTodoList = todoList.map((todo) =>
  //       todo._id === todoItem._id
  //         ? { ...todo, completed: !todoItem.completed }
  //         : todo
  //     );
  //     setTodoList(newTodoList);
  //   });
  // };

    const handleCheck = async (todoItem) => {
     await axios.put(`http://localhost:1234/todos/${todoItem._id}`, {
      name: todoItem.name,
      completed: !todoItem.completed,
    });
    await fetchData();
  };

  const handleAddTodo = async (todoData) => {
    await axios.post("http://localhost:1234/todos", todoData);
      await fetchData();
      setIsOpen(false);
  };

  const handleDelete = async (todoData) => {
    await axios.delete(`http://localhost:1234/todos/${todoData._id}`);
     await fetchData();
  };

  const handleUpdateTodo = async (updatedTodo) => {
     await axios.put(`http://localhost:1234/todos/${updatedTodo._id}`, updatedTodo);
     fetchData();
     setIsEditOpen(false);
  };

  const openEditModal = (todoItem) => {
    setCurrentTodo(todoItem);  
    setIsEditOpen(true);
  };

  return (
    <div className=" absolute w-screen h-screen bg-[url('/background.jpeg')]">
    <div className="p-4 mx-auto my-20 w-[70vw] border shadow-2xl rounded-md bg-white">
      <h1 className="text-2xl text-center font-bold">Todo List</h1>
      <button
        className="border rounded-full p-2 fixed bottom-10 right-20 z-20 shadow-2xl hover:drop-shadow-2xl animate-bounce text-blue-500"
        onClick={() => setIsOpen(true)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      </button>

      {/* Add Todo Dialog */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">

        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
            <DialogTitle className="font-bold">Add a new Todo item</DialogTitle>
            <AddTodo onSubmit={handleAddTodo} />
          </DialogPanel>
        </div>
      </Dialog>

      {/* Edit Todo Dialog */}
      <Dialog open={isEditOpen} onClose={() => setIsEditOpen(false)} className="relative z-50">
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
            <DialogTitle className="font-bold">Edit Todo</DialogTitle>
            {currentTodo && (
              <UpdateTodo onSubmit={handleUpdateTodo} todo={currentTodo} />
            )}
          </DialogPanel>
        </div>
      </Dialog>

      {todoList.map((todoItem) => (
        <div key={todoItem._id} className="flex items-center">
          <Checkbox
            checked={todoItem.completed}
            onChange={() => handleCheck(todoItem)}
            className="group block size-4 rounded border bg-white data-[checked]:bg-blue-500 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[checked]:data-[disabled]:bg-gray-500"
          >
            <svg className="stroke-white opacity-0 group-data-[checked]:opacity-100" viewBox="0 0 14 14" fill="none">
              <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Checkbox>
          <span className="grow">{todoItem.name}</span>
          <button
            className="rounded p-1 border text-green-500 hover:bg-gray-200"
            onClick={() => openEditModal(todoItem)} 
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 3.487l3.65 3.65-9.623 9.623a2.25 2.25 0 0 1-1.006.565l-4.295 1.074a.75.75 0 0 1-.917-.917l1.074-4.295a2.25 2.25 0 0 1 .565-1.006l9.623-9.623zm0 0L20.25 7.5m-5.4 1.35L16.5 6" />
            </svg>
          </button>
          <button
            className="rounded p-1 border text-red-500 hover:bg-gray-200"
            onClick={() => handleDelete(todoItem)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
          </button>
        </div>
      ))}
    </div>
    </div>
  );
}
