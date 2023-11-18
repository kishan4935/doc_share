import React from "react";
import TextEditor from "./components/text-editor";
import { Routes, Route, Navigate } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/rooms/:id" element={<TextEditor />} />
      <Route path="/" element={<Navigate to={`/rooms/${uuidV4()}`} />} />
    </Routes>
  );
}

export default App;
