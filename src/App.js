import "./App.scss";
import { Route, Routes } from "react-router-dom";
import { Header, TreeWrapper } from "./components";
import { LoginScreen } from "./containers/LoginScreen/LoginScreen";
import { RegistrationScreen } from "./containers/RegistrationScreen/Registration";
import { Dashboard } from "./containers/Dashboard/Dashboard";


const App = () => {
  return (
    <div className="app">
      <Routes>
      <Route path="/" element={
        <>
          <Header />
          <TreeWrapper />
        </>
      }/>
        <Route path="/login" element={<LoginScreen/>}/>
        <Route path="/signup" element={<RegistrationScreen/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
      </Routes>
    </div>
  );
};

export default (App);
