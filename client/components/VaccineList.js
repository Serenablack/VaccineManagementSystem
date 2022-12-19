import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { initializeVaccine } from "../reducers/vaccineReducer";
import vaccineServices from "../services/vaccineServices";

const VaccineList = () => {
  const [vaccines, setVaccines] = useState([]);
  const dispatch = useDispatch();

  const vaccineList = useSelector((state) => state.vaccine);
  useEffect(() => {
    dispatch(initializeVaccine());
    setVaccines(vaccineList);
  }, []);

  const handleDelete = async (id) => {
    await vaccineServices.deleteVaccine(id);
  };

  return (
    <div className="table" style={{ width: "150em" }}>
      <div
        className="flex split-pair align-center region-tn"
        style={{ margin: "0 1.5rem 0" }}
      >
        <h2>Vaccine List</h2>
        <div className="flex gap-2">
          <Link to={`/vaccines/add`}>
            <button>Add</button>
          </Link>
        </div>
      </div>

      <table className="tableContainer ">
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Manufacturing company</th>
            <th>Company Email</th>
            <th>Company Contact</th>
            <th>Manufactured Date</th>
            <th>Number Of Dose</th>
          </tr>
        </thead>

        <>
          {vaccines?.map((vac) => (
            <tbody key={vac?.id} className="tbody">
              <Link to={`/vaccines/${vac.id}`}>
                <tr>
                  <td>
                    <img
                      width="100px"
                      src={`${vac.vaccineImage}`}
                      alt="vaccine pic"
                    />
                  </td>
                  <td> {vac?.vaccineName}</td>
                  <td>{vac?.manufacturingCompany}</td>
                  <td>{vac?.companyEmail}</td>
                  <td>{vac?.companyContact}</td>
                  <td> {vac?.manufacturedDate.substring(0, 4)}</td>
                  <td>{vac?.numberOfDose}</td>
                  <>
                    <td>
                      <Link to={`/vaccines/${vac.id}/edit`}>
                        <button
                        // onClick={(event) => {
                        //   event.stopPropagation();
                        // }}
                        >
                          Edit
                        </button>
                      </Link>
                    </td>
                    <td>
                      <button
                        onClick={(event) => {
                          event.stopPropagation();
                          handleDelete(vac?.id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </>
                </tr>
              </Link>
            </tbody>
          ))}
        </>
      </table>
    </div>
  );
};

export default VaccineList;
