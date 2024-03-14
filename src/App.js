// import logo from './logo.svg';
import './App.css';

import { AgGridReact } from 'ag-grid-react'; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import React, { useState, useEffect } from 'react';



// Create new GridExample component
const App = () => {
  // Row Data: The data to be displayed.
  
  const [rowData, setRowData] = useState([]);

  const columnDefs = [];

  // Column Definitions: Defines & controls grid columns.
  const gridOptions = {
    columnDefs: columnDefs,
    enableSorting: true,
    enableFilter: true,
    pagination: true
};

// Fetch data & update rowData state


useEffect(() => {
  async function getRecords() {
    fetch('https://www.ag-grid.com/example-assets/space-mission-data.json') // Fetch data from server
      .then(result => result.json()) // Convert to JSON
      .then(data => {
        setRowData(data); // Update state of `rowData`
        const colDefs = gridOptions.api.getColumnDefs();
        colDefs.length = 0;
        const keys = Object.keys(data[0]);
        keys.forEach(key => colDefs.push({ field: key }));
        gridOptions.api.setColumnDefs(colDefs);
        gridOptions.api.setRowData(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  getRecords();
}, []);
   // eslint-disable-next-line react-hooks/exhaustive-deps
}

  // Container: Defines the grid's theme & dimensions.
  return (
    <div
      className={
        "ag-theme-quartz"
      }
      style={{ width: '100%', height: '100%' }}
    >
      <AgGridReact 
          rowData={rowData} 
          columnDefs={columnDefs}
          // onGridReady={onGridReady} 
          />
    </div>
  );


export default App;












// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
