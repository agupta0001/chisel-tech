import RootLayout from "@/components/RootLayout";
import { ReactElement } from "react";

const Home = () => {
  return <h1>Chisel Tech</h1>;
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};

export default Home;
