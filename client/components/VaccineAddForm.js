import React, { useEffect, useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { appendVaccine } from "../reducers/vaccineReducer";
import vaccineServices from "../services/vaccineServices";

const VaccineAddForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const vaccineList = useSelector((state) => state.vaccine);

  const [vaccine, setVaccine] = useState([]);
  const match = useMatch("/vaccines/:id/add");
  const reqVaccine = match
    ? vaccineList.find((vac) => vac.id === match.params.id)
    : {};

  const vaccineReq = useSelector((state) => state.vaccine);
  useEffect(() => {
    // dispatch(singleVaccine(match.params.id));
    setVaccine(reqVaccine);
  }, []);
  const [pic, setPic] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [date, setDate] = useState("");
  const [dose, setDose] = useState("");
  const [route, setRoute] = useState("");
  const [age, setAge] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const addVaccine = await vaccineServices.postVaccine({
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

    dispatch(appendVaccine(addVaccine));
    navigate("/vaccines");
  };

  return (
    <div>
      <h1 style={{ color: "white" }}>Create new vaccine</h1>
      <form className="wrapper" onSubmit={handleSubmit}>
        <br />
        Picture
        <input
          value={pic}
          id="picUrl"
          onChange={({ target }) => setPic(target.value)}
        />
        Name
        <input
          value={name}
          id="name"
          onChange={({ target }) => setName(target.value)}
        />
        Manufacturing company
        <input
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
          value={contact}
          id="contact"
          onChange={({ target }) => setContact(target.value)}
        />
        Manufactured Date
        <input
          type="date"
          value={date}
          id="date"
          onChange={({ target }) => setDate(target.value)}
        />
        Number Of Dose
        <input
          value={dose}
          id="dose"
          onChange={({ target }) => setDose(target.value)}
        />
        Vaccination Route
        <input
          value={route}
          id="route"
          onChange={({ target }) => setRoute(target.value)}
        />
        Vaccination Age
        <input
          value={age}
          id="age"
          onChange={({ target }) => setAge(target.value)}
        />
        <button>Submit</button>
        <br />
      </form>
    </div>
  );
};

export default VaccineAddForm;
