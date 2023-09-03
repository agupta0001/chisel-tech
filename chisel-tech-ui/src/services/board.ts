import http from "@/lib/http";
import { Board, CreateBoardPayload, DetailedBoard } from "@/types/board";
import { CreateTodoPayload } from "@/types/todo";

export function fetchBoards(): Promise<Board[]> {
  return http.get("/board");
}

export function fetchBoard(id: number): Promise<DetailedBoard> {
  return http.get(`/board/${id}`);
}

export function createBoard(board: CreateBoardPayload): Promise<Board> {
  return http.post("/board", board);
}

export function deleteBoard(id: number): Promise<void> {
  return http.delete(`/board/${id}`);
}

export function createTodo(
  boardId: number,
  todo: CreateTodoPayload
): Promise<Board> {
  return http.post(`/board/${boardId}/todo`, todo);
}
