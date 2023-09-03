import { Todo } from "@/types/todo";
import { FC } from "react";
import TodoItem from "./TodoItem";

interface TodoContainerProps {
  title: string;
  todos: Todo[];
  onTodoUpdate: () => void;
  onTodoEdit: (todo: Todo) => void;
}

const TodoContainer: FC<TodoContainerProps> = ({
  title,
  todos,
  onTodoUpdate,
  onTodoEdit,
}) => {
  return (
    <div className="four wide column">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onTodoUpdate={onTodoUpdate}
          onTodoEdit={onTodoEdit}
        />
      ))}
    </div>
  );
};

export default TodoContainer;
