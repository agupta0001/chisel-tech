import { FC } from "react";
import { Segment } from "semantic-ui-react";

const RootLayout: FC<any> = ({ children }) => {
  return <Segment textAlign="center">{children}</Segment>;
};

export default RootLayout;
