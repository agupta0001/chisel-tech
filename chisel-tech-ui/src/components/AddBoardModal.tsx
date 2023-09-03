import { createBoard } from "@/services/board";
import { useMutation } from "@tanstack/react-query";
import { FC, useState } from "react";
import { Input, Modal } from "semantic-ui-react";

interface AddBoardModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AddBoardModal: FC<AddBoardModalProps> = ({
  open,
  onClose,
  onSuccess,
}) => {
  const [title, setTitle] = useState("");

  const addBoardMutation = useMutation(createBoard, {
    onSuccess: () => {
      onSuccess();
      setTitle("");
    },
  });

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleAddBoard = () => {
    if (!title || title.length < 3) {
      alert("Title must be at least 3 characters long");
      return;
    }
    addBoardMutation.mutate({ title });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Modal.Header>Add Board</Modal.Header>
      <Modal.Content>
        <Input
          placeholder="Board Title"
          className="w-full"
          onChange={handleTitleChange}
          value={title}
        />
      </Modal.Content>
      <Modal.Actions>
        <button className="ui button" onClick={onClose}>
          Cancel
        </button>
        <button className="ui primary button" onClick={handleAddBoard}>
          Add
        </button>
      </Modal.Actions>
    </Modal>
  );
};

export default AddBoardModal;
