"use client";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useRef } from "react";
import { ColDef } from "ag-grid-community";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { Order } from "@prisma/client";

const OrdersTable = ({ data }: { data: Order[] }) => {
  const gridRef = useRef<AgGridReact>(null);

  const columnDefs: ColDef[] = [
    {
      headerName: "Id",
      resizable: true,
      sortable: true,
      field: "id",
      minWidth: 230,
    },
    {
      headerName: "Payment Method",
      resizable: true,
      sortable: true,
      field: "paymentMethod",
    },
    {
      headerName: "Price",
      resizable: true,
      sortable: true,
      field: "totalCost",
    },
    {
      headerName: "Paid",
      resizable: true,
      sortable: true,
      cellRenderer: (params: Params) => (
        <div className="">{params.isPaid ? "Paid" : "UnPaid"}</div>
      ),
    },
    {
      headerName: "Id",
      resizable: true,
      sortable: true,
      cellRenderer: (params: Params) => (
        <div className="">
          {params.isDelivered ? "Delivered" : "Not Delivered"}
        </div>
      ),
    },
  ];
  return (
    <>
      <h1 className="text-xl md:text-3xl font-bold mb-5 px-4">Your Orders</h1>

      <div className="ag-theme-alpine h-[300px] max-w-[1000px] mx-auto">
        <AgGridReact
          ref={gridRef}
          columnDefs={columnDefs}
          rowData={data}
          alwaysShowHorizontalScroll
          alwaysShowVerticalScroll
          className="h-full"
          rowHeight={45}
          headerHeight={45}
        />
      </div>
    </>
  );
};

export default OrdersTable;
