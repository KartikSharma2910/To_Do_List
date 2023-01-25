import { useEffect, useState } from "react";
import "./styles.css";

type TaskProps = {
  id: string | undefined;
  name: string | undefined;
};

const getLocalData = () => {
  const task = localStorage.getItem("tasks");
  return task && JSON.parse(localStorage.getItem("tasks") || "{}");
};

const List = () => {
  const [value, setValue] = useState("");
  const [task, setTask] = useState<TaskProps[]>(getLocalData());
  const [edit, setEdit] = useState(false);
  const [isEditItem, setIsEditItem] = useState(0);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(task));
  }, [task]);

  // Add Item to the list

  const addItem = () => {
    if (!value) {
      return;
    } else if (value && edit) {
      setTask(
        task.map((elem, index) => {
          if (index === isEditItem) {
            return { ...elem, name: value };
          }
          return elem;
        })
      );
      setValue("");
      setEdit(false);
    } else {
      const newTask = [...task];
      const inputData = {
        id: new Date().getTime().toString(),
        name: value,
      };
      newTask.push(inputData);
      setTask(newTask);
      setValue("");
    }
  };

  // delete item from the list

  const deleteItem = (id: number) => {
    const updatedItems = task.filter((_, idx) => {
      return idx !== id;
    });
    setTask(updatedItems);
  };

  // edit list items

  const editItem = (id: number) => {
    const newEditItems: any = task.find((_, idx) => {
      return idx === id;
    });
    console.log(newEditItems);
    setEdit(true);
    setValue(newEditItems?.name);
    setIsEditItem(id);
  };

  return (
    <div className="container">
      <img src="/todo.png" alt="todo" className="imageWrapper" />
      <div className="inputWrapper">
        <input
          className="input"
          placeholder="Enter your task here..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          className="addTask"
          disabled={value === ""}
          onClick={() => addItem()}
        >
          {edit ? "Edit Task" : "Add Task"}
        </button>
      </div>
      <div className="itemsWrapper">
        {task.map((item, index) => {
          return (
            <div key={index} className="item">
              <div className="task">{item.name}</div>
              <div>
                <img
                  src="/edit.png"
                  alt="edit"
                  className="editImageIcon"
                  onClick={() => editItem(index)}
                />
                <img
                  onClick={() => deleteItem(index)}
                  src="/delete.png"
                  alt="delete"
                  className="deleteImageIcon"
                />
              </div>
            </div>
          );
        })}
      </div>
      <div>
        <button className="clearButton" onClick={() => setTask([])}>
          Clear All
        </button>
      </div>
    </div>
  );
};

export default List;
