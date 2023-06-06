import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthorizeUser } from "./middleware/auth";
import '@progress/kendo-theme-default/dist/all.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/home",
    element: (
      <AuthorizeUser>
        <Home />
      </AuthorizeUser>
    ),
  },
]);
const App = () => {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
