import { Helmet } from "react-helmet";
import Search from "../Search/Search";

export default function Home() {
  return (
    <>
      <Helmet>
        <title> Home </title>
      </Helmet>
      <div className="  w-full container mx-auto flex items-center justify-center  text-5xl font-bold px-4 h-screen">
        We are still working on the site, wait...
      </div>
    </>
  );
}
