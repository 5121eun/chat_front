import { WEB_DESCRIPTION, WEB_TITLE } from "./lib/constants";
import Room from "./ui/room";

export default function Home() {
  return (
    <main className="flex flex-col h-screen items-center p-5">
      <div className="flex flex-col h-1/6 items-center justify-center">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">{WEB_TITLE}</h1>
        <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">{WEB_DESCRIPTION}</p>
      </div>
      <div className="h-5/6 w-2/3 bg-white justify-center">
        <Room />
      </div>
    </main>
  );
}
