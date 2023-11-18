import React, { useCallback, useEffect, useState } from "react";
import Quill from "quill";
import { io, Socket } from "socket.io-client";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import "quill/dist/quill.snow.css";
import "./styles.css";

//interval for auto saving the document
const SAVE_INTERVAL_MS = 2000;

//quill toolbar options
const TOOLBAR_OPIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
];

export default function TextEditor() {
  const [socket, setSocket] = useState<Socket>();
  const [quill, setQuill] = useState<Quill>();
  const { id: roomId } = useParams();

  //useEffect for connecting and disconnecting to our socket
  useEffect(() => {
    const s = io(process.env.REACT_APP_SERVER_URL || "http://localhost:3001");
    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);

  //useEffect for auto saving the document
  useEffect(() => {
    if (socket == null || quill == null) return;

    const interval = setInterval(() => {
      socket.emit("save-document", quill.getContents());
    }, SAVE_INTERVAL_MS);
    return () => {
      clearInterval(interval);
    };
  }, [socket, quill]);

  //useEffect for getting the contents of our current room
  useEffect(() => {
    if (socket == null || quill == null) return;

    socket.on("load-document", (document) => {
      quill.setContents(document);
      quill.enable();
    });

    socket.emit("get-room", roomId);
  }, [socket, quill, roomId]);

  //useEffect for handling changes made by other users on our document.
  useEffect(() => {
    if (quill == null || socket == null) return;

    const handleChange = (delta: any) => {
      quill.updateContents(delta);
    };

    socket.on("recieve-changes", handleChange);

    return () => {
      socket.off("recieve-changes", handleChange);
    };
  }, [quill, socket]);

  //useEffect for sending our changes in our document to the server
  useEffect(() => {
    if (quill == null || socket == null) return;

    const handleChange = (delta: Object, oldDelta: Object, source: String) => {
      if (source !== "user") return;
      socket.emit("send-changes", delta);
    };

    quill.on("text-change", handleChange);

    return () => {
      quill.off("text-change", handleChange);
    };
  }, [quill, socket]);

  //callback function for creating new instance of quill and quill toolbar
  const wrapperRef = useCallback(
    (
      wrapper: HTMLDivElement
    ): React.LegacyRef<HTMLDivElement> | null | undefined => {
      if (!wrapper) return;
      wrapper.innerText = "";

      const editor = document.createElement("div");
      wrapper.append(editor);
      const q = new Quill(editor, {
        theme: "snow",
        modules: { toolbar: TOOLBAR_OPIONS },
      });

      q.disable();
      q.setText("Loading...");
      setQuill(q);
    },
    []
  );

  //useEffect for creating share button
  useEffect(() => {
    const button = document.createElement("button");
    button.innerText = "Share";
    button.style.backgroundColor = "rgb(68,110,208)";
    button.style.fontFamily = "'Source Sans Pro', sans-serif";
    button.style.padding = "6px 10px";
    button.style.height = "auto";
    button.style.width = "auto";
    button.style.color = "#fff";
    button.style.fontSize = "15px";
    button.addEventListener("click", copyDocumentLink);

    const toolbar = document.querySelector(".ql-toolbar");
    toolbar?.append(button);
  }, [wrapperRef]);

  //function for copying Room url to clipboard.
  const copyDocumentLink = () => {
    navigator.clipboard.writeText(window.location.href);
    Swal.fire(
      "Congratulations!",
      "The link of your Room has been copied!!",
      "success"
    );
  };

  return <div className="container" ref={wrapperRef}></div>;
}
