import { Board } from "@/types/board";
import { FC, useMemo, useState } from "react";
import { Confirm, Icon, Menu, Tab, TabProps } from "semantic-ui-react";
import BoardContainer from "./BoardContainer";
import AddBoardModal from "./AddBoardModal";
import { deleteBoard } from "@/services/board";
import { useMutation } from "@tanstack/react-query";

interface BoardTabsProps {
  boards: Board[];
  refetchBoards: () => void;
}

const BoardTabs: FC<BoardTabsProps> = ({ boards, refetchBoards }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [openAddBoardModal, setOpenAddBoardModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const deleteBoardMutation = useMutation(deleteBoard, {
    onSuccess: () => {
      refetchBoards();
    },
  });

  const handleTabChange = (_: any, { activeIndex }: TabProps) => {
    if (activeIndex === boards.length) {
      setOpenAddBoardModal(true);
      return;
    }
    setActiveTab(Number(activeIndex));
  };

  const handleBoardDelete = (boardId: number) => {
    deleteBoardMutation.mutate(boardId);
  };

  const panes = useMemo(
    () => [
      ...boards.map((board) => ({
        menuItem: (
          <Menu.Item key={board.id} as="div">
            <span className="mr-4">{board.title}</span>{" "}
            <Icon
              name="close"
              onClick={(e: any) => {
                e.stopPropagation();
                setShowConfirm(true);
              }}
            />
          </Menu.Item>
        ),
        render: () => (
          <Tab.Pane>
            <BoardContainer board={board} />
          </Tab.Pane>
        ),
      })),
      {
        menuItem: (
          <Menu.Item>
            <Icon name="plus" />
          </Menu.Item>
        ),
        render: () => <></>,
      },
    ],
    [boards]
  );

  const handleAddBoardSuccess = () => {
    refetchBoards();
    setOpenAddBoardModal(false);
  };

  return (
    <>
      <Tab
        panes={panes}
        activeIndex={activeTab}
        onTabChange={handleTabChange}
      />
      <AddBoardModal
        open={openAddBoardModal}
        onClose={() => setOpenAddBoardModal(false)}
        onSuccess={handleAddBoardSuccess}
      />
      <Confirm
        open={showConfirm}
        content="Are you sure you want to delete this board? This will also delete all the todo's in this board."
        onCancel={() => setShowConfirm(false)}
        onConfirm={() => {
          handleBoardDelete(boards[activeTab].id);
          setShowConfirm(false);
        }}
      />
    </>
  );
};

export default BoardTabs;
