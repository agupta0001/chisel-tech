import BoardTabs from "@/components/BoardTabs";
import RootLayout from "@/components/RootLayout";
import { FETCH_ALL_BOARDS } from "@/lib/queryKeys";
import { fetchBoards } from "@/services/board";
import { useQuery } from "@tanstack/react-query";
import { ReactElement, useMemo } from "react";
import { Button, Icon, Image, Message, Segment, Tab } from "semantic-ui-react";

const Home = () => {
  const allBoardsQuery = useQuery([FETCH_ALL_BOARDS], fetchBoards);

  if (allBoardsQuery.isLoading) {
    return (
      <Segment textAlign="center">
        <Icon name="spinner" loading />
      </Segment>
    );
  }

  if (allBoardsQuery.isError) {
    return (
      <Message negative>
        <Message.Header>
          Something went wrong while loading boards.{" "}
          <Button onClick={() => allBoardsQuery.refetch()}>Try Again</Button>
        </Message.Header>
      </Message>
    );
  }

  return <BoardTabs boards={allBoardsQuery.data} />;
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};

export default Home;
