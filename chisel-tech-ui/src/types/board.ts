import { Todo } from "./todo";

export type Board = {
  id: number;
  title: string;
  create_at: string;
  update_at: string;
  deleted_at: string;
};

export type DetailedBoard = Board & { todos: Todo[] };

export type CreateBoardPayload = {
  title: string;
};
