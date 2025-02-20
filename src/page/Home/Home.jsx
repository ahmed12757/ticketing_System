import { Helmet } from "react-helmet";

export default function Home() {
  return (
    <>
      <Helmet>
        <title> Home </title>
      </Helmet>
      <div className="  w-full container mx-auto  text-5xl font-bold px-4 h-screen">
        We are still working on the site, wait...
      </div>
    </>
  );
}
