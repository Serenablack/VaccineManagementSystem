import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useMatch } from "react-router-dom";

const VaccineDetail = () => {
  const [vaccine, setVaccine] = useState([]);
  const vaccines = useSelector((state) => state.vaccine);

  const match = useMatch("/vaccines/:id");

  const reqVaccine = match
    ? vaccines.find((vac) => vac.id === match.params.id)
    : {};

  useEffect(() => {
    setVaccine(reqVaccine);
  }, []);

  return (
    <div className="region-md flex gap-2">
      <div>
        <img src={vaccine?.vaccineImage} alt="vaccineImage" width="400px" />
      </div>
      <div className="detailContainer" style={{ height: "265px" }}>
        <h3> {vaccine?.vaccineName}</h3>
        <div> Manufacturing company: {vaccine?.manufacturingCompany}</div>
        <div> Company Email: {vaccine?.companyEmail}</div>
        <div>Company Contact: {vaccine?.companyContact}</div>
        <div>
          Manufactured Date: {vaccine?.manufacturedDate?.substring(0, 4)}
        </div>
        <div>Number Of Dose: {vaccine?.numberOfDose}</div>
        <div>Vaccination Route: {vaccine?.vaccineRoute}</div>
        <div> Vaccination Age: {vaccine?.vaccinationAge}</div>
        <div> {vaccine?.isMandatory === false ? null : "Mandatory"}</div>
      </div>
    </div>
  );
};

export default VaccineDetail;
