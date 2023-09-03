import { Board } from "@/types/board";
import { FC, useMemo } from "react";
import { Tab } from "semantic-ui-react";

interface BoardTabsProps {
  boards: Board[];
}

const BoardTabs: FC<BoardTabsProps> = ({ boards }) => {
  const panes = useMemo(
    () =>
      boards.map((board) => ({
        menuItem: board.title,
        render: () => <Tab.Pane>{board.title}</Tab.Pane>,
      })),
    [boards]
  );

  return <Tab panes={panes} />;
};

export default BoardTabs;
