import http from "@/lib/http";
import { Todo, UpdateTodoPayload } from "@/types/todo";

export function updateTodo({
  id,
  ...payload
}: UpdateTodoPayload & { id: number }): Promise<Todo> {
  return http.patch(`/todo/${id}`, payload);
}

export function deleteTodo(id: number): Promise<Todo> {
  return http.delete(`/todo/${id}`);
}
