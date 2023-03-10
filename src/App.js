import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Color from "./pages/Color";
import Orientation from "./pages/Orientation";
import Trial from "./pages/Trial";
import Instructon from "./pages/Instruction";
import Feedback from "./pages/Feedback";

function App() {

  const routes = [
    {path: "/", element: <Home />},
    {path: "/color", element: <Color />},
    {path: "/orientation", element: <Orientation />},
    {path: "/trial", element: <Trial />},
    {path: "/instructions", element: <Instructon />},
    {path: "/feedback", element: <Feedback />}
  ];

  const routeComponents = routes.map(({path, element}, key) => (
    <Route exact path={path} element={element} key={key}/>
  ));

  return (
    <BrowserRouter>
      <Routes>{routeComponents}</Routes>
    </BrowserRouter>
  );
}

export default App;
