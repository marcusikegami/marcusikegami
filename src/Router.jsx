import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import BRAIN_GAME_0_1 from "./views/BrainGame/BrainGame_0_1";
import BRAIN_GAME_0_2 from "./views/BrainGame/BrainGame_0_2";
import CaseStudies from "./views/CaseStudies/CaseStudies";
import Games from "./views/Games";
import Projects from "./views/Projects/Projects";

const Router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                element: <Projects />,
                index: true,
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
                path: "/case-studies",
                element: <CaseStudies />,
            }
        ],
    },
    {
        path: "/braingame",
        element: <DefaultLayout />,
        children: [
            {
                element: <BRAIN_GAME_0_1 />,
                index: true,
            },
            {
                path: "/braingame/0_2",
                element: <BRAIN_GAME_0_2 />,
            }
        ],
    },
    {
        path: "*",
        element: <div>404 Page not found.</div>,
    },
], { basename: '/marcusikegami'});

export default Router;