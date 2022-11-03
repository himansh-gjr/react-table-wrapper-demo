import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import './index.css'
import { HomePage } from './HomePage';
import BasicTable from './BasicTable';
import RowSelectTable from './RowSelectTable';
import SortingTable from './SortingTable';
import DemoTable from './DemoTable';

const router = createBrowserRouter([
  {
    path: "react-table-wrapper",
    element: <HomePage />,
  },
  {
    path: "react-table-wrapper/basic-table",
    element: <BasicTable />,
  },
  {
    path: "react-table-wrapper/row-select-table",
    element: <RowSelectTable />,
  },
  {
    path: "react-table-wrapper/sorting-table",
    element: <SortingTable />,
  },
  {
    path: "react-table-wrapper/demo-table",
    element: <DemoTable />,
  },
  
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>
)
