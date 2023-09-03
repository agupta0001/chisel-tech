import { FETCH_BOARD_DETAILS } from "@/lib/queryKeys";
import { fetchBoard } from "@/services/board";
import { Todo, TodoStatus } from "@/types/todo";
import { useQuery } from "@tanstack/react-query";
import { FC, useMemo } from "react";
import { Button, Icon, Message, Segment } from "semantic-ui-react";
import TodoContainer from "./TodoContainer";
import CreateTodo from "./CreateTodo";
import { Board } from "@/types/board";

interface BoardContainerProps {
  board: Board;
}

const BoardContainer: FC<BoardContainerProps> = ({ board }) => {
  const boardQuery = useQuery([FETCH_BOARD_DETAILS, board.id], () =>
    fetchBoard(board.id)
  );

  const [openTodos, completedTodos]: [Todo[], Todo[]] = useMemo(() => {
    if (!boardQuery.data?.todos) return [[], []];

    return [
      boardQuery.data.todos.filter(
        (todo) => todo.status !== TodoStatus.COMPLETED
      ),
      boardQuery.data.todos.filter(
        (todo) => todo.status === TodoStatus.COMPLETED
      ),
    ];
  }, [boardQuery.data?.todos]);

  if (boardQuery.isLoading) {
    return (
      <Segment textAlign="center">
        <Icon name="spinner" loading />
      </Segment>
    );
  }

  if (boardQuery.isError) {
    return (
      <Message negative>
        <Message.Header>
          Something went wrong while loading boards.{" "}
          <Button onClick={() => boardQuery.refetch()}>Try Again</Button>
        </Message.Header>
      </Message>
    );
  }

  return (
    <div className="ui grid full-width">
      <TodoContainer
        todos={openTodos}
        title="New Tasks"
        onTodoUpdate={boardQuery.refetch}
      />
      <CreateTodo board={board} onSuccess={boardQuery.refetch} />
      <TodoContainer
        todos={completedTodos}
        title="Completed Tasks"
        onTodoUpdate={boardQuery.refetch}
      />
    </div>
  );
};

export default BoardContainer;
