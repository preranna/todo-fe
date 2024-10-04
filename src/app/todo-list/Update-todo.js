import { Switch } from "@headlessui/react";
import { useState } from "react";

export function UpdateTodo({ onSubmit, todo }) {
    const [name, setName] = useState(todo.name);
    const [completed, setCompleted] = useState(todo.completed);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit({ _id: todo._id, name, completed });
    };
  
    return (
        <form onSubmit={handleSubmit}
            className="flex flex-col items-start gap-2 rounded"
        >
            <label>
                <div>
                    Name:
                </div>
                <input
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="border border-black rounded-lg px-2 py-1 focus:outline-blue-500"
                />
            </label>

            <label className="flex items-center justify-between w-full" > 
                <span className="mr-2">
                    Completed:
                </span>
                <Switch
                    checked={completed}
                    onChange={setCompleted}
                    className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-[checked]:bg-blue-600"
                >
                    <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6" />
                </Switch>
            </label>
            <div className="flex items-center justify-between w-full">
            <button
                className="px-1 py-0.5 rounded-md bg-blue-500 text-black hover:bg-blue-600 hover:px-1.5 hover:py-1"
                type="reset"
            >
          Cancel
            </button>
            <button
                className="px-1 py-0.5 rounded-md bg-gray-300 text-black hover:bg-gray-400 hover:px-1.5 hover:py-1"
                type="submit"
            >
            Save
            </button>
            </div>
          
        </form>
    );
}