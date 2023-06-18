import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { appendVaccine, removeVaccine } from "../reducers/vaccineReducer";
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
  const [mandatory, setMandate] = useState(true);

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

  const handleEdit = async (vac, state) => {
    const buttonClicked = window.confirm(
      "Do you want to mark the vaccine as mandatory?"
    );
    if (buttonClicked) {
      const vaccineUpdated = await vaccineServices.putVaccine(vac.id, {
        ...vac,
        isMandatory: state,
      });
      console.log(vaccineUpdated);
    }
  };

  return (
    <div>
      <div className="flex split-pair gap-2">
        <h2>Vaccine List</h2>
        <Link
          onClick={() => window.localStorage.removeItem("authorizedUserToken")}
          to={`/`}
        >
          <button>Sign Out</button>
        </Link>
        <Link to={`/vaccines/add`}>
          <button>Add</button>
        </Link>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Picture</StyledTableCell>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">
                Manufacturing company
              </StyledTableCell>
              <StyledTableCell align="center">Company email</StyledTableCell>
              <StyledTableCell align="center">Company contact</StyledTableCell>
              <StyledTableCell align="center">
                Manufactured date
              </StyledTableCell>
              <StyledTableCell align="center">Number of dose</StyledTableCell>
              <StyledTableCell align="center">Edit</StyledTableCell>
              <StyledTableCell align="center">Delete</StyledTableCell>
              <StyledTableCell align="center">Mandatory</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <>
              {vaccines.map((vac) => (
                <StyledTableRow key={vac?.id}>
                  <StyledTableCell
                    component="th"
                    scope="row"
                    onClick={() => navigate(`/vaccines/${vac.id}`)}
                  >
                    <img
                      src={vac?.vaccineImage}
                      alt="imageVac"
                      style={{ width: "150px" }}
                    />
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {vac?.vaccineName}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {vac?.manufacturingCompany}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {vac?.companyEmail}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {vac?.companyContact}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {vac?.manufacturedDate.substring(0, 4)}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {vac?.numberOfDose}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <button
                      onClick={(event) => {
                        event.stopPropagation();
                        navigate(`/vaccines/${vac.id}/edit`);
                      }}
                    >
                      Edit
                    </button>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <button
                      onClick={(event) => {
                        event.stopPropagation();
                        handleDelete(vac.id);
                      }}
                    >
                      Delete
                    </button>
                  </StyledTableCell>
                  <StyledTableCell>
                    <input
                      type="checkbox"
                      checked={vac?.isMandatory}
                      onChange={(event) => {
                        setMandate(event.target.checked);
                        handleEdit(vac, !vac?.isMandatory);
                      }}
                    />
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
