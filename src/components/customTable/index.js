import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 70, sortable: true },
  { field: "firstName", headerName: "First name", width: 200, sortable: true },
  { field: "lastName", headerName: "Last name", width: 200, sortable: true },
  {
    field: "dateOfBirth",
    headerName: "Date Of Birth",
    width: 200,
    sortable: true,
  },
];


export default function CustomTable({ rowData }) {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rowData}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}
