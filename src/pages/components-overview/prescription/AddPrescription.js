import React, { useEffect, useState } from "react";
import AddForm from "./AddPrescriptionForm";
import { ConsultationService } from "../../../provider/consultation.provider";
import { fDate } from "../../../utils/formatTime";
import { PatientService } from "../../../provider/patient.provider";
import { TableContext } from "../../context/PatientContext";
import { Stack, TextField, Autocomplete } from "@mui/material";

const AddPrescription = () => {
  const [consultations, setConsultations] = useState([]);
  const [patients, setPatients] = useState([]);
  const [patientId, setPatient] = useState();

  useEffect(() => {
    getConsultations();
    getPatients();
  }, []);

  const getPatients = () => {
    PatientService.getPatients().then((res) => {
      if (res && Array.isArray(res)) {
        setPatients(res);
      }
    });
  };
  const getConsultations = () => {
    ConsultationService.getConsultations().then((res) => {
      if (res && Array.isArray(res)) {
        setConsultations(res);
      }
    });
  };
  const patientsName = patients.map((item) => {
    const { firstName, lastName, id } = item;
    return { label: `${firstName} ${lastName}`, id: id };
  });
  const consultInfo =
    patientId &&
    consultations
      .filter((consult) => consult?.patient?.id === patientId)
      .map((item) => {
        const { createdAt, reason, id } = item;
        return { label: `${fDate(createdAt)} | ${reason}`, id: id };
      });

  const [value, setValue] = useState();
  const [inputValue, setInputValue] = useState("");
  const [inputPValue, setInputPValue] = useState("");
  return (
    <TableContext.Provider value={{ consultations }}>
      <Stack
        direction="row"
        spacing={3}
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={patientsName}
          fullWidth
          // sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Rechercher un patient" />
          )}
          value={value}
          onChange={(event, newValue) => {
            setPatient(newValue.id);
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
        />
        <Autocomplete
          disablePortal
          fullWidth
          id="combo-box-demo"
          options={consultInfo}
          // sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Rechercher une consultation" />
          )}
          value={value}
          onChange={(event, inputPValue) => {
            setValue(inputPValue);
          }}
          inputValue={inputPValue}
          onInputChange={(event, newInputValue) => {
            setInputPValue(newInputValue);
          }}
        />
      </Stack>
      <div style={{ marginBottom: 15 }}></div>
      <AddForm patientId={value ? value.id : null} />
    </TableContext.Provider>
  );
};

export default AddPrescription;
