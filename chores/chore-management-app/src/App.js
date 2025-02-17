// // import logo from './logo.svg';
// // import './App.css';

// // function App() {
// //   return (
// //     <div className="App">
// //       <header className="App-header">
// //         <img src={logo} className="App-logo" alt="logo" />
// //         <p>
// //           Edit <code>src/App.js</code> and save to reload.
// //         </p>
// //         <a
// //           className="App-link"
// //           href="https://reactjs.org"
// //           target="_blank"
// //           rel="noopener noreferrer"
// //         >
// //           Learn React
// //         </a>
// //       </header>
// //     </div>
// //   );
// // }

// // export default App;


// // src/App.js
// import React from 'react';
// import './App.css'; // This is where Tailwind CSS is imported via index.css
// import Header from './components/Header';
// import ChoreGrid from './components/ChoreGrid';

// function App() {
//   return (
//     <div className="min-h-screen bg-gray-100">
//       <Header />
//       <main className="container mx-auto p-4">
//         <ChoreGrid />
//       </main>
//     </div>
//   );
// }

// export default App;

import React from "react";
import ChoreTable from "./components/ChoreTable";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        Chore Management Web App
      </h1>
      <ChoreTable />
    </div>
  );
}

export default App;
