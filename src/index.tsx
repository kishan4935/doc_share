import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Routers } from "react-router-dom";
import App from "./App";

//@ts-ignore
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Routers>
    <App />
  </Routers>
);
