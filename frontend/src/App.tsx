import { useEffect } from "react";
import "./App.css";
import MainApp from "./common/MainApp/MainApp";
import useNotification from "./common/Notification/useNotification";
import { useAppSelector } from "./common/store/redux";
import LoginPage from "./modules/Authentication/Pages/LoginPage";

function App() {
  const user = useAppSelector((state) => state.authentication.user);

  useNotification();

  useEffect(() => {}, []);

  return user ? <MainApp /> : <LoginPage />;
}

export default App;
