import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./common/store/store";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";

const MyRoutes = () => {
  return (
    <Provider store={store}>
      <Routes>
        <Route path={"/*"} element={<App />} />
      </Routes>
    </Provider>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const router = createBrowserRouter(
  createRoutesFromElements(<Route path="*" element={<MyRoutes />} />)
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
