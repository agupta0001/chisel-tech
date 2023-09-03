import { createTodo } from "@/services/board";
import { updateTodo } from "@/services/todo";
import { Board } from "@/types/board";
import { Todo } from "@/types/todo";
import { useMutation } from "@tanstack/react-query";
import { FC, useEffect, useState } from "react";
import { Button, Input } from "semantic-ui-react";

interface CreateTodoProps {
  board: Board;
  onSuccess: () => void;
  editTodo?: Todo | null;
}

const CreateTodo: FC<CreateTodoProps> = ({ board, onSuccess, editTodo }) => {
  const [title, setTitle] = useState(editTodo?.title || "");

  const createTodoMutation = useMutation(
    () => createTodo(board.id, { title }),
    {
      onSuccess: () => {
        setTitle("");
        onSuccess();
      },
    }
  );

  const updateTodoMutation = useMutation(updateTodo, {
    onSuccess: () => {
      setTitle("");
      onSuccess();
    },
  });

  useEffect(() => {
    if (editTodo) setTitle(editTodo.title);
  }, [editTodo]);

  const handleTodoSave = () => {
    if (!title || title.length < 3) {
      alert("Task should be atleast 3 characters long");
    }

    if (editTodo) {
      updateTodoMutation.mutate({
        id: editTodo.id,
        title,
        status: editTodo.status,
      });
    } else {
      createTodoMutation.mutate();
    }
  };

  return (
    <div className="eight wide column">
      <h3 className="text-center text-xl font-bold">{board.title} View</h3>
      <div className="flex items-center mt-4 flex-col">
        <Input
          className="px-5 w-full mb-4"
          placeholder="Enter a Task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button
          className="!self-end !mr-5"
          onClick={handleTodoSave}
          disabled={!title}
        >
          {Boolean(editTodo) ? "Update" : "Create"} Todo
        </Button>
      </div>
    </div>
  );
};

export default CreateTodo;
