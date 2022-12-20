import React, { useEffect, useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import vaccineServices from "../services/vaccineServices";
import { initializeVaccine } from "../reducers/vaccineReducer";

const VaccineForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(initializeVaccine());
  }, []);
  const vaccineList = useSelector((state) => state.vaccine);
  const [vaccine, setVaccine] = useState([]);
  const match = useMatch("/vaccines/:id/edit");
  const reqVaccine = match
    ? vaccineList.find((vac) => vac.id === match.params.id)
    : {};
  console.log(reqVaccine);

  const [pic, setPic] = useState("");

  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [date, setDate] = useState("");
  const [dose, setDose] = useState("");
  const [route, setRoute] = useState("");
  const [age, setAge] = useState("");
  useEffect(() => {
    setVaccine(reqVaccine);
    setPic(vaccine?.vaccineImage);
    setName(vaccine?.vaccineName);
    setCompany(vaccine?.manufacturingCompany);
    setEmail(vaccine?.companyEmail);
    setContact(vaccine?.companyContact);
    setDate(vaccine?.manufacturedDate?.substring(0, 4));
    setDose(vaccine?.numberOfDose);

    setRoute(vaccine?.vaccineRoute);
    setAge(vaccine?.vaccinationAge);
  }, [vaccine]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedVaccine = await vaccineServices.putVaccine(vaccine.id, {
      vaccineName: name,
      manufacturingCompany: company,
      companyEmail: email,
      companyContact: contact,
      manufacturedDate: date,
      numberOfDose: dose,
      vaccineRoute: route,
      vaccinationAge: age,
      vaccineImage: pic,
    });
    dispatch(initializeVaccine());
    navigate("/vaccines");
  };
  return (
    <div>
      <h1 style={{ color: "white" }}>Edit Details</h1>
      <form className="wrapper" onSubmit={handleSubmit}>
        <br />
        Picture
        <input
          type="blob"
          value={pic}
          id="picUrl"
          onChange={({ target }) => setPic(target.value)}
        />
        Name
        <input
          type="text"
          value={name}
          id="name"
          onChange={({ target }) => setName(target.value)}
        />
        Manufacturing company
        <input
          type="text"
          value={company}
          id="company"
          onChange={({ target }) => setCompany(target.value)}
        />
        Company Email
        <input
          type="email"
          value={email}
          id="email"
          onChange={({ target }) => setEmail(target.value)}
        />
        Company Contact
        <input
          type="contact"
          value={contact}
          id="contact"
          onChange={({ target }) => setContact(target.value)}
        />
        Manufactured Date
        <input
          type="text"
          value={date}
          id="date"
          onChange={({ target }) => setDate(target.value)}
        />
        Number Of Dose
        <input
          type="text"
          value={dose}
          id="dose"
          onChange={({ target }) => setDose(target.value)}
        />
        Vaccination Route
        <input
          type="text"
          value={route}
          id="route"
          onChange={({ target }) => setRoute(target.value)}
        />
        Vaccination Age
        <input
          type="text"
          value={age}
          id="age"
          onChange={({ target }) => setAge(target.value)}
        />
        <button type="submit"> Submit</button>
        <br />
      </form>
    </div>
  );
};

export default VaccineForm;
