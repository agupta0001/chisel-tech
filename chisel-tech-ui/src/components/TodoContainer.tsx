import { Todo } from "@/types/todo";
import { FC } from "react";

interface TodoContainerProps {
  title: string;
  todos: Todo[];
}

const TodoContainer: FC<TodoContainerProps> = ({ title }) => {
  return (
    <div className="four wide column">
      <h3 className="text-xl font-bold">{title}</h3>
    </div>
  );
};

export default TodoContainer;
