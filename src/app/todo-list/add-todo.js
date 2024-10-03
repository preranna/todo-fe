import { useState } from "react";

export function AddTodo({onSubmit}){
    const [name, setName] = useState("");
    const [completed,setCompleted] = useState(false); 

    const handleSubmit = (e) =>{
       e.preventDefault();
       onSubmit({name,completed});  
    };

    return(
        <form onSubmit={handleSubmit}
               className="flex flex-col items-start gap-2 rounded p-3 border border-gray-400" 
        >
            <label>
                <div>
                Name:
                </div>
                <input
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
            </label>

            <label>
                <div>
                Completed:
                </div>
                <input
                  type= "checkbox"
                  value={completed}
                  onChange={e => setCompleted(e.target.value)}
                />
            </label>
            <button
                className="px-2 py-0.5 rounded-md bg-gray-500 text-white hover:bg-gray-700 hover:px-2 hover:py-2" 
                type="submit"
            >
                Add Post
            </button>
        </form>
    );
}