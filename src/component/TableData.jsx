import React, { useState } from "react";

import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Stack,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

const TableData = (data) => {
  const [modalOpen, setModalOpen] = useState(false);

  const headerTable = [
    { id: "name.title", label: "Title" },
    { id: "name.first", label: "Full Name" },
    { id: "email", label: "Email" },
    { id: "", label: "Cell" },
    { id: "gender", label: "Gender" },
    { id: "", label: "Avatar URL" },
    { id: "dob.date", label: "Birthyear" },
    { id: "login.username", label: "Username" },
    { id: "location.postcode", label: "Postcode" },
    { id: "location.country", label: "Country" },
    { id: "location.state", label: "State" },
    { id: "location.city", label: "City" },
    { id: "", label: "Street" },
    { id: "", label: "Timezone" },
    { id: "nat", label: "Nationality" },
    { id: "", label: "Download CSV" },
  ];

  const renderTable = (userDataList) => (
    <Table stickyHeader sx={{ width: "100%", height: "100vh" }}>
      <TableHead>
        <TableRow>
          {headerTable?.map((item) =>
            item.id ? (
              <TableCell
                className={`row `}
                id={item.id}
                onMouseEnter={onMouseEnterTableHead}
                onMouseLeave={onMouseLeaveTableHead}
                onClick={onClickTableHead}
                style={{ cursor: "pointer" }}
              >
                <div className="header--label" data-index={item.id}>
                  {item.label}
                </div>
                {displayArrow(item.id)}
              </TableCell>
            ) : (
              <TableCell className={`row `}>{item.label}</TableCell>
            )
          )}
        </TableRow>
      </TableHead>
      <TableBody>{renderUserRow(sortData(userDataList))}</TableBody>
    </Table>
  );

  const renderUserRow = (data) => (
    <TableRow>
      <TableCell>{data.name.title}</TableCell>
      <TableCell
        onClick={() => {
          setDetailData(data);
          setModalOpen(true);
        }}
        style={{
          cursor: "pointer",
          ":hover": {
            textDecoration: "underline",
            color: "red",
          },
        }}
      >
        {data.name.first + " " + data.name.last}
      </TableCell>
      <TableCell>{data.email}</TableCell>
      <TableCell>{data.cell}</TableCell>
      <TableCell>{data.gender}</TableCell>
      <TableCell>{data.picture.large}</TableCell>
      <TableCell>{new Date(data.dob.date).getFullYear()}</TableCell>
      <TableCell>{data.login.username}</TableCell>
      <TableCell>{data.location.postcode}</TableCell>
      <TableCell>{data.location.country}</TableCell>
      <TableCell>{data.location.state}</TableCell>
      <TableCell>{data.location.city}</TableCell>
      <TableCell>
        {data.location.street.number + " " + data.location.street.name}
      </TableCell>
      <TableCell>{data.location.timezone.offset}</TableCell>
      <TableCell>{data.nat}</TableCell>
      <TableCell>
        <a
          href="http://randomuser.me/api/?format=csv"
          style={{ color: "grey" }}
        >
          <DownloadIcon sx={{ ":hover": { color: "blue" } }} />
        </a>
      </TableCell>
    </TableRow>
  );

  const renderDialog = (detailData) => (
    <Dialog
      scroll="paper"
      fullWidth="60%"
      maxWidth="sm"
      open={modalOpen}
      onClose={() => setModalOpen(false)}
    >
      <DialogTitle>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1 className="dialog--name">Thông tin chi tiết</h1>
          <h1
            style={{ cursor: "pointer", marginRight: "2rem" }}
            onClick={() => setModalOpen(false)}
          >
            X
          </h1>
        </div>
      </DialogTitle>
      <DialogContent>
        <img
          src={detailData.picture.large}
          style={{ float: "left", marginRight: "1rem" }}
        />
        <div className="Data">
          <h2 style={{ marginTop: "0" }}>
            {detailData.name.title +
              " " +
              detailData.name.first +
              " " +
              detailData.name.last}
          </h2>
          <p>Email: {detailData.email}</p>
          <p>SDT: {detailData.cell}</p>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div>
      <TableContainer sx={{ height: "80vh" }}>
        {renderTable(data)}
      </TableContainer>
    </div>
  );
};

export default TableData;
