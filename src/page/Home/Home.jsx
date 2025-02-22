import { Helmet } from "react-helmet";

export default function Home() {
  return (
    <>
      <Helmet>
        <title> Home </title>
      </Helmet>
      <div className="  w-full container mx-auto flex items-center justify-center  text-5xl font-bold px-4 h-screen">
        There are no solutions for tickets yet...
      </div>
    </>
  );
}
