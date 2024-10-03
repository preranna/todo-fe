"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Checkbox, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { AddTodo } from "./add-todo";

export default function TodoPage() {
  const [todoList, setTodoList] = useState([]);
  let [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get("http://localhost:1234/todos");
        setTodoList(response.data);
      } catch (err) {
        console.error(err);
      } 
    };
    fetchTodos();
  }, []);
  
  const handleCheck = (todoItem) => {
    axios.put(`http://localhost:1234/todos/${todoItem._id}`,{
      name : todoItem.name,
      completed : !todoItem.completed
    }).then(() => {
      const newTodoList = todoList.map (todo => {
        return todo._id === todoItem._id
        ? {
          ...todo,
          completed : !todoItem.completed,
        }
        : todo;
      });
      setTodoList(newTodoList);
    });
  };

  const handleAddTodo = (todoData) => {
    axios.post("http://localhost:1234/todos",todoData).then((response) =>{
      setTodoList([...todoList,response.data]);
      setIsOpen(false);
    });
  };
    return(
        <div className="p-4">
          <h1 className="text-2xl">Todo List</h1>
          {/* <button className="border rounded px-2 py-1 bg-gray-200 hover:bg-gray-400">Add todo</button> */}
          <button className="border rounded px-2 py-1 bg-gray-200 hover:bg-gray-400" onClick={() => setIsOpen(true)}>Add todo</button>
          <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
              <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
                  <DialogTitle className="font-bold">Add a new Todo item</DialogTitle>
                  <AddTodo onSubmit={handleAddTodo}/>
                </DialogPanel>
              </div>
          </Dialog>
          {
            todoList.map(todoItem => (
                <div key={todoItem._id}>{todoItem.name} 
               <Checkbox
                checked={todoItem.completed}
                onChange={() =>handleCheck(todoItem)}
                className="group block size-4 rounded border bg-white data-[checked]:bg-blue-500 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[checked]:data-[disabled]:bg-gray-500"
              >
                <svg className="stroke-white opacity-0 group-data-[checked]:opacity-100" viewBox="0 0 14 14" fill="none">
                    <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </Checkbox>
            </div> 
            ))
          }
        </div>
    );
}