# Doc Share

Doc Share is a web application that offers all the functionalities of a word editor. Its standout feature is the document-sharing functionality, which enables multiple users to collaborate and work together on a single document. The frontend of the application is built using React, the Quill Text Editor library, and Socket.IO (web sockets), while the backend is developed using Node.js and Express.

## Getting Started

To get started with the Online Text Editor application, follow the instructions below:

### Prerequisites

- Node.js (version >= 16)

### Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/jatinkh25/doc_share_frontend
   ```

2. Navigate to the project directory:

   ```bash
   cd doc_share_frontend
   ```

3. Install the dependencies:

   ```bash
   yarn install
   ```

### Usage

1. Start the development server:

   ```bash
   npm dev
   ```

2. Open your browser and visit `http://localhost:3000` to access the Online Text Editor web application.

## Features

The Online Text Editor web application offers the following features:

1. **Word Editor Functionalities**: The application provides a rich set of word editor functionalities, including text formatting (bold, italic, underline), text alignment, lists (bulleted and numbered), font selection, and more.

2. **Document Sharing**: Multiple users can collaborate and work together on a single document in real-time. Any changes made by one user will be instantly reflected on the screens of all other users working on the same document.

3. **Real-Time Collaboration**: The application utilizes web sockets (Socket.IO) to enable real-time collaboration. Users can see each other's cursor positions and selections, allowing for seamless collaboration and coordination.

## Technologies

The Online Text Editor web application is built using the following technologies:

- React: A JavaScript library for building user interfaces.
- Quill Text Editor: A powerful, extensible, and customizable rich text editor for the web.
- Socket.IO: A library that enables real-time, bidirectional communication between web clients and servers using web sockets.
- Node.js: A JavaScript runtime environment that allows running JavaScript on the server side.
- Express: A minimal and flexible Node.js web application framework for building robust APIs and web applications.

## Contributing

Contributions to the Online Text Editor web application are welcome. If you want to contribute, please follow the guidelines outlined in the [CONTRIBUTING.md](CONTRIBUTING.md) file.

## License

The Online Text Editor web application is open source and is available under the [MIT License](LICENSE). Feel free to modify and use the code according to your needs.
