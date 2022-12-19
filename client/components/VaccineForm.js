import React, { useEffect, useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import vaccineServices from "../services/vaccineServices";
import { initializeVaccine, singleVaccine } from "../reducers/vaccineReducer";

const VaccineForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(initializeVaccine());
  }, []);
  const vaccineList = useSelector((state) => state.vaccine);
  const [vaccine, setVaccine] = useState([]);
  const match = useMatch("/vaccines/:id/edit");
  console.log(match.params.id);
  const reqVaccine = match
    ? vaccineList.find((vac) => vac.id === match.params.id)
    : {};
  console.log(reqVaccine);
  useEffect(() => {
    // dispatch(singleVaccine(match.params.id));

    setVaccine(reqVaccine);
  }, [dispatch]);

  const [pic, setPic] = useState(vaccine?.vaccineImage);

  const [name, setName] = useState(vaccine?.vaccineName);
  const [company, setCompany] = useState(vaccine?.manufacturingCompany);
  const [email, setEmail] = useState(vaccine?.companyEmail);
  const [contact, setContact] = useState(vaccine?.companyContact);
  const [date, setDate] = useState(vaccine?.manufacturedDate?.substring(0, 4));
  const [dose, setDose] = useState(vaccine?.numberOfDose);
  const [route, setRoute] = useState(vaccine?.vaccineRoute);
  const [age, setAge] = useState(vaccine?.vaccinationAge);
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
    console.log(updatedVaccine);
    navigate("/vaccines");
  };

  return (
    <form onSubmit={handleSubmit}>
      <br />
      Picture
      <input
        type="text"
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
        type="date"
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
  );
};

export default VaccineForm;
