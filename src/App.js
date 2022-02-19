import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { MainComponent } from "./components/MainComponent";
import { Nav } from "./components/nav";
import { TaskComponent } from "./components/TaskComponent";
import { InfoComponent } from "./components/InfoComponent";
import { HeaderComponent } from "./components/header";
import { CompletedComponent } from "./components/CompletedComponent";

/*
The Main App: Adds the header and the navigation bar and by using
React Router creates the paths to the other 'pages'.
*/
function App() {
  return (
    <BrowserRouter>
      <HeaderComponent />
      <Nav />
      <Routes>
        <Route path="/" element={<MainComponent />} />
        <Route path="/tasks" element={<TaskComponent />} />
        <Route path="/completed" element={<CompletedComponent />} />
        <Route path="/info" element={<InfoComponent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
