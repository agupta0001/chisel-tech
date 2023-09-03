import { deleteTodo, updateTodo } from "@/services/todo";
import { Todo, TodoStatus } from "@/types/todo";
import { useMutation } from "@tanstack/react-query";
import { FC, useEffect } from "react";
import { Button, Checkbox, Icon } from "semantic-ui-react";

interface TodoItemProps {
  todo: Todo;
  onTodoUpdate: () => void;
  onTodoEdit: (todo: Todo) => void;
}

const TodoItem: FC<TodoItemProps> = ({ todo, onTodoUpdate, onTodoEdit }) => {
  const updateTodoMutation = useMutation(updateTodo);
  const deleteTodoMutation = useMutation(deleteTodo);

  useEffect(() => {
    if (updateTodoMutation.isSuccess || deleteTodoMutation.isSuccess) {
      onTodoUpdate();
    }
  }, [updateTodoMutation.isSuccess, deleteTodoMutation.isSuccess]);

  const handleTodoUpdate = async () => {
    updateTodoMutation.mutate({
      id: todo.id,
      status:
        todo.status === TodoStatus.OPEN
          ? TodoStatus.COMPLETED
          : TodoStatus.OPEN,
    });
  };

  const handleDelete = () => {
    deleteTodoMutation.mutate(todo.id);
  };

  return (
    <div className="flex mb-4 justify-between">
      <div className="mr-3">
        <p
          className={`text-lg ${
            todo.status === TodoStatus.COMPLETED ? "line-through" : ""
          } `}
        >
          {todo.title}
        </p>
      </div>
      <div>
        <Checkbox
          checked={todo.status === TodoStatus.COMPLETED}
          className="mr-4"
          onChange={handleTodoUpdate}
        />

        <Button icon onClick={() => onTodoEdit(todo)}>
          <Icon name="edit" />
        </Button>

        <Button icon onClick={handleDelete}>
          <Icon name="trash" />
        </Button>
      </div>
    </div>
  );
};

export default TodoItem;
