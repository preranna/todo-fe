"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Checkbox } from "@headlessui/react";

export default function TodoPage() {
  const [todoList, setTodoList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get("http://localhost:1234/todos");
        setTodoList(response.data);
      } catch (err) {
        console.error("Error fetching todo list:", err.response ? err.response.data : err.message);
        setError("Error fetching todo list");
      } 
    };
    fetchTodos();
  }, []);
  
  const handleCheck = (id) => {
    console.log(`Checkbox toggled for todo with id: ${id}`);
  };


    return(
        <div>
          {
            todoList.map(todoItem => (
                <div key={todoItem._id}>{todoItem.name} 
               <Checkbox
                checked={todoItem.completed}
                onChange={handleCheck}
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