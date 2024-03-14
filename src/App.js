import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { createGrid } from 'ag-grid-community';

const App = () => {
  const gridOptions = {
    columnDefs: [],
    rowData: [],
  };

  async function fetchData() {
    try {
      const response = await fetch('https://www.ag-grid.com/example-assets/space-mission-data.json');
      const data = await response.json();
      gridOptions.columnDefs = Object.keys(data[0]).map(key => ({
        headerName: key,
        field: key,
      }));
      gridOptions.rowData = data;
      const gridDiv = document.querySelector('#grid');
      createGrid(gridDiv, gridOptions);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  fetchData();
};

export default App;

// import './App.css';
// import { AgGridReact } from 'ag-grid-react'; // AG Grid Component
// import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
// import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
// import React, { useState, useEffect } from 'react';

// // Create new GridExample component
// const App = () => {
//   const [rowData, setRowData] = useState([]);
//   const [columnDefs, setColumnDefs] = useState([]);
//   const [gridApi, setGridApi] = useState(null); // Add gridApi state

//   const gridOptions = {
//     enableSorting: true,
//     enableFilter: true,
//     pagination: true
//   };

//   const onGridReady = (params) => {
//     gridOptions.api = params.api;
//     gridOptions.columnApi = params.columnApi;
//     setGridApi(params.api); // Set gridApi state
//   };

//   useEffect(() => {
//     async function getRecords() {
//       try {
//         const response = await fetch('https://www.ag-grid.com/example-assets/space-mission-data.json');
//         const data = await response.json();
//         console.log('Fetched data:', data);
//         setRowData(data);
//         const keys = Object.keys(data[0]);
//         console.log('Keys:', keys);
//         const newColumnDefs = keys.map(key => ({ field: key }));
//         setColumnDefs(newColumnDefs);
//         if (gridApi) { // Check if gridApi is defined
//           gridApi.setRowData(data); // Set row data using gridApi
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     }

//     getRecords();
//   }, [gridApi]); // Add gridApi as a dependency

//   return (
//     <div className="ag-theme-quartz" style={{ width: '100%', height: '100%' }}>
//       <AgGridReact
//         rowData={rowData}
//         columnDefs={columnDefs}
//         onGridReady={onGridReady}
//       />
//     </div>
//   );
// };



