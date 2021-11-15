import React from "react";
import "./App.css";
import TodoTask from "./components/TodoTask";

export interface ITask {
  taskName: string;
  deadline: number;
}

const App: React.FC = () => {
  const [task, setTask] = React.useState<string>("");
  const [deadline, setDeadline] = React.useState<number>(0);
  const [todo, setTodo] = React.useState<ITask[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.name === "task") {
      setTask(e.target.value);
    } else {
      setDeadline(Number(e.target.value));
    }
  };

  const addTask = (): void => {
    const newTask = {
      taskName: task,
      deadline: deadline,
    };

    setTodo([...todo, newTask]);
    setTask("");
    setDeadline(0);
  };

  const completeTask = (taskNameToDelete: string): void => {
    setTodo(todo.filter((task) => {
      return task.taskName !== taskNameToDelete;
    }))
  }

  return (
    <div className="App">
      <div className="header">
        <div className="inputContainer">
          <input
            type="text"
            placeholder="Task..."
            name="task"
            value={task}
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="Deadline (in Days)..."
            name="deadline"
            value={deadline}
            onChange={handleChange}
          />
        </div>
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className="todoList">
        {todo.map((item: ITask, key: number) => {
          return <TodoTask key={key} task={item} completeTask={completeTask} />;
        })}
      </div>
    </div>
  );
};

export default App;
