import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import BrainGame from "./views/BrainGame/BrainGame";
import Games from "./views/Games";
import Projects from "./views/Projects";

const Router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "/",
                element: <Projects />,
                // element: <Navigate to="/projects" />,
            },
            {
                path: "/projects",
                element: <Projects />,
            },
            {
                path: "/games",
                element: <Games />
            },
            {
                path: "/braingame",
                element: <BrainGame />
            }
        ],
    },

    {
        path: "*",
        element: <div>404 Page not found.</div>,
    },
]);

export default Router;