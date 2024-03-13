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
  async function getRecords() {fetch('https://www.ag-grid.com/example-assets/space-mission-data.json') // Fetch data from server
    .then(result => result.json()) // Convert to JSON
    // .then(rowData => setRowData(result)) // Update state of `rowData`
    .then(function (data) {
      const colDefs = gridOptions.api.getColumnDefs();
      colDefs.length=0;
      const keys = Object.keys(data[0])
      keys.forEach(key => colDefs.push({field: key}))
      gridOptions.api.setColumnDefs(colDefs)

      // gridOptions.api.setRowData(data);
   // eslint-disable-next-line react-hooks/exhaustive-deps
})}

getRecords()

}, [])

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
};

// function App() {
//   return (
//     <div
//          className="ag-theme-quartz" // applying the grid theme
//    style={{ height: 500 }} // the grid will fill the size of the parent container
//   >
//     <AgGridReact
//         // rowData={rowData}
//         // columnDefs={colDefs}
//         onGridReady={onGridReady}
//     />
//     </div>
//   );
// }

    // { make: 'Tesla', model: 'Model Y', price: 64950, electric: true },
    // { make: 'Ford', model: 'F-Series', price: 33850, electric: false },
    // { make: 'Toyota', model: 'Corolla', price: 29600, electric: false },

      // const onGridReady=(params)=>{
  //   console.log("grid is ready")
  //   fetch('https://www.ag-grid.com/example-assets/row-data.json').then(resp=>resp.json())

    // .then(resp=>params.applyTransaction(Clear))
    // .then(resp=>params.api.applyTransaction({add:resp})
  // )}

  // const [colDefs, setColDefs] = useState([
  //   { field: 'make' },
  //   { field: 'model' },
  //   { field: 'price' },
  //   { field: 'electric' },
  // ]);

  // .then(colDefs => setColDefs(colDefs));
  // .then(rowData => setRowData(rowData)) {// Update state of `rowData`

export default App;
