import React, { useState, useEffect } from "react";
import axios from "axios";

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

import DownloadIcon from "@mui/icons-material/Download";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
const App = () => {
  const [userDataList, setUserDataList] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [detailData, setDetailData] = useState({});
  const [mouseEnter, setMouseEnter] = useState("");
  const [onSort, setOnSort] = useState({ id: "", typeSort: "default" });
  const [modalOpen, setModalOpen] = useState(false);
  const [pagePaganition, setpagePaganition] = useState(1);
  const [sexFilter, setSexFilter] = useState("");
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios(`https://randomuser.me/api?results=200`).then(({ data }) =>
      setUserDataList(data.results)
    );
  };

  useEffect(() => {
    if (sexFilter) {
      axios(`https://randomuser.me/api?results=200&gender=${sexFilter}`).then(
        ({ data }) => setFilteredData(data.results)
      );
    }
  }, [sexFilter]);

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

  const sexOption = [
    { value: "", label: "Giới tính" },
    { value: "male", label: "Nam" },
    { value: "female", label: "Nữ" },
  ];

  const typeSorts = {
    up: {
      fnNumber: (a, b) => {
        return (
          new Date(onSort?.id.split(".").reduce((c, d) => c[d], a)).getYear() -
          new Date(onSort?.id.split(".").reduce((c, d) => c[d], b)).getYear()
        );
      },
      fnString: (a, b) =>
        onSort?.id.split(".").reduce((c, d) => c[d], a) >
        onSort?.id.split(".").reduce((c, d) => c[d], b)
          ? 1
          : onSort?.id.split(".").reduce((c, d) => c[d], b) >
            onSort?.id.split(".").reduce((c, d) => c[d], a)
          ? -1
          : 0,
    },

    down: {
      fnNumber: (a, b) =>
        new Date(onSort?.id.split(".").reduce((c, d) => c[d], b)).getYear() -
        new Date(onSort?.id.split(".").reduce((c, d) => c[d], a)).getYear(),
      fnString: (a, b) =>
        onSort?.id.split(".").reduce((c, d) => c[d], b) >
        onSort?.id.split(".").reduce((c, d) => c[d], a)
          ? 1
          : onSort?.id.split(".").reduce((c, d) => c[d], a) >
            onSort?.id.split(".").reduce((c, d) => c[d], b)
          ? -1
          : 0,
    },

    default: {
      fn: (a, b) => a,
    },
  };

  const sortData = (userDataList) => {
    const temp = [...userDataList];
    if (onSort.typeSort === "up") {
      if (onSort.id === "dob.date") {
        return temp?.sort(typeSorts.up.fnNumber);
      } else {
        return temp?.sort(typeSorts.up.fnString);
      }
    } else if (onSort.typeSort === "down") {
      if (onSort.id === "dob.date") {
        return temp?.sort(typeSorts.down.fnNumber);
      } else {
        return temp?.sort(typeSorts.down.fnString);
      }
    } else {
      return temp;
    }
  };

  // Các thành phần render

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

  const displayArrow = (id) => {
    if (id === onSort.id && onSort.typeSort === "up")
      return <KeyboardArrowUpIcon fontSize="small" />;
    else if (id === onSort.id && onSort.typeSort === "down")
      return <KeyboardArrowDownIcon fontSize="small" />;
    else if (id === mouseEnter) return <KeyboardArrowUpIcon fontSize="small" />;
  };

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
                <div
                  className="header--label"
                  style={{ alignContent: "center" }}
                  data-index={item.id}
                >
                  <span>
                    {item.label}
                    {displayArrow(item.id)}
                  </span>
                </div>
              </TableCell>
            ) : (
              <TableCell className={`row `}>{item.label}</TableCell>
            )
          )}
        </TableRow>
      </TableHead>
      <TableBody>
        {sortData(userDataList).map((item) => renderUserRow(item))}
      </TableBody>
    </Table>
  );

  // Xử lý sự kiện
  const handlePagination = (event, value) => {
    setpagePaganition(value);
  };
  const handleChangeSexFilter = (e) => {
    setSexFilter(e.target.value);
  };

  const onMouseEnterTableHead = (e) => {
    setMouseEnter(e.target.id);
  };

  const onMouseLeaveTableHead = (e) => {
    setMouseEnter("");
  };

  const onClickTableHead = (e) => {
    //Trường được click liên tục
    if (onSort.id === e.currentTarget.id) {
      switch (onSort.typeSort) {
        case "default": {
          setOnSort({ id: e.currentTarget.id, typeSort: "up" });
          break;
        }

        case "up": {
          setOnSort({ id: e.currentTarget.id, typeSort: "down" });
          break;
        }

        case "down": {
          setOnSort({ id: e.currentTarget.id, typeSort: "default" });
          break;
        }
      }
    }
    //Trường được click lần đầu
    else setOnSort({ id: e.currentTarget.id, typeSort: "up" });
  };

  return (
    <div className="App">
      <div style={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <TableContainer sx={{ height: "80vh" }}>
            {sexFilter
              ? renderTable(
                  [...filteredData]?.splice(
                    (pagePaganition - 1) * 20,
                    20 * (pagePaganition + 1)
                  )
                )
              : renderTable(
                  [...userDataList]?.splice(
                    (pagePaganition - 1) * 20,
                    20 * (pagePaganition + 1)
                  )
                )}
          </TableContainer>
          <Stack spacing={2} sx={{ display: "flex" }}>
            <div
              className="row"
              style={{
                display: "flex",
                padding: "0.5rem 4rem",
                marginTop: "1rem",
              }}
            >
              <FormControl fullWidth>
                <InputLabel id="sex-filter">Lọc theo giới tính</InputLabel>
                <Select
                  labelId="sex-filter"
                  label="Lọc theo giới tính"
                  value={sexFilter}
                  onChange={handleChangeSexFilter}
                  sx={{ width: "180px" }}
                >
                  {sexOption?.map((item) => (
                    <MenuItem value={item.value}>{item.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Pagination
                count={10}
                page={pagePaganition}
                size="large"
                on
                sx={{ display: "flex", justifyContent: "center" }}
                onChange={handlePagination}
              />
            </div>
          </Stack>
        </Paper>
      </div>

      {modalOpen ? renderDialog(detailData) : <></>}
    </div>
  );
};

export default App;
