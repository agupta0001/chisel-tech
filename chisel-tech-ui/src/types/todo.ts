export enum TodoStatus {
  OPEN = "open",
  COMPLETED = "completed",
}

export type Todo = {
  id: number;
  title: string;
  status: TodoStatus;
  create_at: string;
  update_at: string;
  deleted_at: string;
  board_id: number;
};

export type CreateTodoPayload = {
  title: string;
  status?: TodoStatus;
};

export type UpdateTodoPayload = {
  title?: string;
  status?: TodoStatus;
};
