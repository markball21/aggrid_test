import './App.css';
import { AgGridReact } from 'ag-grid-react'; // AG Grid Component
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise'; // Import ag-grid-enterprise module
import React, { useEffect, useState, useRef } from 'react';
import { exportDataAsCsv } from 'ag-grid-community';

const App = () => {
  const [rowData, setRowData] = useState([]);
  const [columnDefs, setColumnDefs] = useState([]);
  const gridApiRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://hp-api.onrender.com/api/characters');
        const data = await response.json();
        console.log('Fetched data:', data);
        setRowData(data);
        const keys = Object.keys(data[0]);
        console.log('Keys:', keys);
        const newColumnDefs = keys.map(key => ({ headerName: key.toUpperCase(), field: key, sortable: true, filter: true, resizable: true, movable: true, editable: true }));
        setColumnDefs(newColumnDefs);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  const onGridReady = (params) => {
    gridApiRef.current = params.api;
  };

  const exportGridData = () => {
    if (gridApiRef.current) {
      gridApiRef.current.exportDataAsCsv();
    }
  };

  console.log('rowData:', rowData);
  console.log('columnDefs:', columnDefs);

  return (
    <div className="ag-theme-alpine" style={{ height: 800, width: 1200 }}>
      <div>
        <button onClick={exportGridData}>Export</button>
      </div>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        onGridReady={onGridReady}
        enableCharts // Enable integrated charts
      />
    </div>
  );
};

export default App;



