import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeVaccine } from "../reducers/vaccineReducer";
import vaccineServices from "../services/vaccineServices";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const VaccineList = () => {
  const [vaccines, setVaccines] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const vaccineList = useSelector((state) => state.vaccine);
  useEffect(() => {
    setVaccines(vaccineList);
  }, [vaccineList]);

  const handleDelete = async (id) => {
    await vaccineServices.deleteVaccine(id);
    const vaccineRem = vaccines.filter((vac) => {
      return vac.id !== id;
    });
    console.log(vaccineRem);
    dispatch(removeVaccine(vaccineRem));
  };

  return (
    <div>
      <div className="flex split-pair gap-2">
        <h2>Vaccine List</h2>
        <Link to={`/vaccines/add`}>
          <button>Add</button>
        </Link>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Picture</StyledTableCell>
              <StyledTableCell align="right">Name</StyledTableCell>
              <StyledTableCell align="right">
                Manufacturing company
              </StyledTableCell>
              <StyledTableCell align="right">Company email</StyledTableCell>
              <StyledTableCell align="right">Company contact</StyledTableCell>
              <StyledTableCell align="right">Manufactured date</StyledTableCell>
              <StyledTableCell align="right">Number of dose</StyledTableCell>
              <StyledTableCell align="right">Edit</StyledTableCell>
              <StyledTableCell align="right">Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <>
              {vaccines.map((vac) => (
                <StyledTableRow key={vac?.id}>
                  <StyledTableCell component="th" scope="row">
                    <img
                      src={vac?.vaccineImage}
                      alt="imageVac"
                      style={{ width: "150px" }}
                    />
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {vac?.vaccineName}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {vac?.manufacturingCompany}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {vac?.companyEmail}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {vac?.companyContact}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {vac?.manufacturedDate.substring(0, 4)}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {vac?.numberOfDose}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <button
                      onClick={(event) => {
                        event.preventDefault();
                        navigate(`/vaccines/${vac.id}/edit`);
                      }}
                    >
                      Edit
                    </button>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <button
                      onClick={() => {
                        handleDelete(vac.id);
                      }}
                    >
                      Delete
                    </button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default VaccineList;
