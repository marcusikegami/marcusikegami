import { Link, Outlet } from "react-router-dom";

const DefaultLayout = ({ children }) => {
    return (
        <div
            id="default-layout"
            className="flex flex-col min-[600px]:flex-row w-full min-h-screen"
        >
            <aside className="flex min-[600px]:flex-col px-8 py-4 min-[600px]:pt-8 bg-green-700">
                <h1 className="text-2xl font-mono font-semibold  text-white underline pb-2">Directory</h1>
                <Link
                    className="py-1 px-2 text-white rounded ease-in-out duration-300 hover:bg-green-600 hover:underline"
                    to="/case-studies"
                >
                    Case Studies
                </Link>
                <Link
                    className="py-1 px-2 text-white rounded ease-in-out duration-300 hover:bg-green-600 hover:underline"
                    to="/projects"
                >
                    Projects
                </Link>
                <Link
                    className="py-1 px-2 text-white rounded ease-in-out duration-300 hover:bg-green-600 hover:underline"
                    to="/games"
                >
                    Games
                </Link>
            </aside>
            <div id="content" className="w-full">
                <header className="flex items-center justify-between w-full p-8">
                    <div>
                        <h1 className="text-lg font-mono drop-shadow-md">
                            <a href="https://github.com/marcusikegami" rel="noreferrer" target="_blank" className="hover:underline">github.com/marcusikegami</a>
                        </h1>
                    </div>
                </header>
                <div className="drop-shadow-lg w-full border border-gray-200" />
                <main className="flex justify-center items-center mt-8">
                    <Outlet />{" "}
                    {/* Outlet Components render the children components listed under <DefaultLayout>'s in the Router */}
                </main>
            </div>
        </div>
    );
};

export default DefaultLayout;
