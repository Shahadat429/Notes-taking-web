import { createBrowserRouter } from "react-router-dom";
import Root from "../pages/Root";
import Dashboard from "../pages/Dashboard";
import Login from "./Login";

const Routes = createBrowserRouter([
    {
        path: "/",
        Component: Root,
        children:[
            {
                index: true,
                Component: Dashboard
            },
        ]
    }
])

export default Routes;