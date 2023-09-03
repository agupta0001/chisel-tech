import { createTodo } from "@/services/board";
import { Board } from "@/types/board";
import { useMutation } from "@tanstack/react-query";
import { FC, useState } from "react";
import { Button, Input } from "semantic-ui-react";

interface CreateTodoProps {
  board: Board;
  onSuccess: () => void;
}

const CreateTodo: FC<CreateTodoProps> = ({ board, onSuccess }) => {
  const [title, setTitle] = useState("");
  const createTodoMutation = useMutation(
    () => createTodo(board.id, { title }),
    {
      onSuccess: () => {
        setTitle("");
        onSuccess();
      },
    }
  );

  const handleTodoSave = () => {
    if (!title || title.length < 3) {
      alert("Task should be atleast 3 characters long");
    }

    createTodoMutation.mutate();
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
          Create Todo
        </Button>
      </div>
    </div>
  );
};

export default CreateTodo;
