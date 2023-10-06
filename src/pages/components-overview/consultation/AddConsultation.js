import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
// import { rows } from "../patient/ListPatient";
import AddForm from "./AddForm";
import { PatientService } from "../../../provider/patient.provider";
import { TableContext } from "../../context/PatientContext";
const AddConsultation = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    getPatients();
  }, []);

  const getPatients = () => {
    PatientService.getPatients().then((res) => {
      if (res && Array.isArray(res)) {
        setPatients(res);
      }
    });
  };
  const patientsName = patients.map((item) => {
    const { firstName, lastName, id } = item;
    return { label: `${firstName} ${lastName} | 0014`, id: id };
  });

  const [value, setValue] = useState();
  const [inputValue, setInputValue] = useState("");
  return (
    <TableContext.Provider value={{patients}}>
      <Autocomplete
        style={{ marginBottom: "3" }}
        disablePortal
        id="combo-box-demo"
        options={patientsName}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label="Rechercher un patient" />
        )}
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
      />
      <div style={{ marginBottom: 15 }}></div>
      <AddForm patientId={value ? value.id : null} />
    </TableContext.Provider>
  );
};

export default AddConsultation;
