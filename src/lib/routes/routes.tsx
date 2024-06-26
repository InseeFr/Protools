import type { RouteObject } from "react-router-dom";
import Home from "../../components/pages/home/Home";
import Visualize from "../../components/pages/visualize/Visualize";
import Launch from "../../components/pages/launch/Launch";
import UploadFile from "../../components/shared/tasks/UploadFile/UploadFile";
import ValidateTask from "../../components/shared/tasks/ValidationTask/ValidationTask";
import History from "../../components/pages/history/History";
import NotFound from "../../components/pages/notFound/NotFound";
import VisualizeHistory from "../../components/pages/visualize/VisualizeHistory";

// Temp routing
const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/visualize/:id/:processDefinitionId",
    element: <Visualize />,
  },
  {
    path: "/launch",
    element: <Launch />,
  },
  {
    path: "/upload-context/:taskId",
    element: <UploadFile />,
  },
  {
    path: "/validation-task/:taskId",
    element: <ValidateTask />,
  },
  {
    path: "/history",
    element: <History />,
  },
  {
    path: "/history/:id/:processDefinitionId",
    element: <VisualizeHistory />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
