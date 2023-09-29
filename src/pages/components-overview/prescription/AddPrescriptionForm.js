import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import {
  Button,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
  Autocomplete,
  TextField,
  CardContent,
  Card,
} from "@mui/material";
import AnimateButton from "components/@extended/AnimateButton";

import { TableContext } from "../../context/PatientContext";
import swal from "../../../assets/sweet.alert";
import { PrescriptionService } from "../../../provider/prescription.provider";

export const PRESCRIPTION_TYPE = [
  {label: 'A ACHETER'},
  {label: 'A INJECTER'},
];

export const MEDICATION_NAME = [

  { label: "ASPIRINE" },
  { label: "IBUPROFÈNE" },
  { label: "PARACÉTAMOL" },
  { label: "AMOXICILLINE" },
  { label: "LIPITOR" },
  { label: "VITAMINE C" },
  { label: "ATÉNOLOL" },
  { label: "LANSOPRAZOLE" },
  { label: "ALBUTÉROL" },
  { label: "INSULINE" },
  { label: "AUTRE" },
];
const AddForm = ({ patientId: consultationId }) => {
  const navigate = useNavigate();

  const [type, setType] = useState(PRESCRIPTION_TYPE[0]);
  const [inputReason, setInputReason] = useState("");
  const [medicationName, setHistoryType] = useState(MEDICATION_NAME[0]);
  const [inputHistoryType, setinputHistoryType] = useState("");
  const { consultations } = useContext(TableContext);

  const OhandleSubmit = (data) => {
    const medication = {
      dosage: data.dosage,
      name: medicationName.label,
    };

    PrescriptionService.createPrescription({
      ...data,
      consultationId,
      medication,
    })
      .then((resp) => {
        console.log("Ordonnance ===", resp);
        if (resp) {
          {
            swal(`Ordonnance ajouté`, "", "success");
          }
          navigate("/consultation/lister");
        }
      })
      .catch((error) => {
        console.log("ERROR::===", error);
        {
          swal(`Une erreur s'est produite. Veuillez réessayer!`, "", "error");
        }
      });
  };

  if (consultationId == null) {
    return (
      <div>
        {/* <Card md={12}>
          <CardContent>
            <Typography variant="h3" style={{ textAlign: "center" }}>
              Aucun patient sélectionné
            </Typography>
          </CardContent>
        </Card> */}
      </div>
    );
  }
  const consult = consultations?.find((patient) => patient.id === consultationId);
  const patient = consultations?.find((patient) => patient.id === consultationId)?.patient;
  return (
    <>
      <div>
        <Card md={12}>
          <CardContent md={12}>
            <Typography variant="h3">Informations du patient</Typography>
            <div style={{ display: "flex" }}>
              <div style={{ display: "flex" }}>
                <pre>Nom:</pre>
                <pre>
                  {" "}
                  <b>{patient?.lastName}</b>
                </pre>
              </div>
              <div style={{ display: "flex", marginLeft: 35 }}>
                <pre>Prénom(s):</pre>
                <pre>
                  {" "}
                  <b>{patient?.firstName}</b>
                </pre>
              </div>
              <div style={{ display: "flex", marginLeft: 35 }}>
                <pre>Sex:</pre>
                <pre>
                  {" "}
                  <b>{patient?.sex}</b>
                </pre>
              </div>
            </div>
            <div style={{ display: "flex" }}>
              <div style={{ display: "flex" }}>
                <pre>Situation matrimoniale:</pre>
                <pre>
                  {" "}
                  <b>{patient?.maritalStatus}</b>
                </pre>
              </div>
              <div style={{ display: "flex", marginLeft: 35 }}>
                <pre>Téléphone:</pre>
                <pre>
                  {" "}
                  <b>{patient?.phone}</b>
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div style={{ marginBottom: 45 }}></div>
      <Formik
        initialValues={{
          type: "A ACHETER",
          dosage: "Selon le notice",
          observation: "Une simple observation",
          name: "ASPIRINE",
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().max(255).required("Ce champ est obligatoire"),
          type: Yup.string().max(255).required("Ce champ est obligatoire"),
          observation: Yup.string()
            .max(255)
            .required("Ce champ est obligatoire"),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            setStatus({ success: false });
            setSubmitting(false);
          } catch (err) {
            console.error(err);
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
          }
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
        }) => (
          <form
            noValidate
            onSubmit={handleSubmit}
            method="POST"
            action="submit"
          >
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Stack spacing={1}>
                  <Autocomplete
                    style={{ marginTop: 3 }}
                    disablePortal
                    id="type"
                    name="type"
                    options={PRESCRIPTION_TYPE}
                    // sx={{ width: 400 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Type d'ordonnance" />
                    )}
                    value={type ? type : inputReason}
                    onChange={(event, newValue) => {
                      setType(newValue);
                    }}
                    inputValue={inputReason}
                    onInputChange={(event, newInputValue) => {
                      setInputReason(newInputValue);
                    }}
                  />

                  {{ reason: type } == null || { inputReason } == null}
                </Stack>
              </Grid>
              <Grid item xs={12} md={12}>
                <InputLabel htmlFor="">
                  {" "}
                  <h2>MÉDICAMENT</h2>
                </InputLabel>
              </Grid>
              <Grid item xs={12} md={4}>
                <Stack spacing={1}>
                  <Autocomplete
                    style={{ marginTop: 15 }}
                    disablePortal
                    id="medication_name"
                    required={true}
                    options={MEDICATION_NAME}
                    name="name"
                    renderInput={(params) => (
                      <TextField {...params} label="Nom du médicament" />
                    )}
                    value={medicationName ? medicationName : inputHistoryType}
                    onChange={(event, newValue) => {
                      setHistoryType(newValue);
                    }}
                    inputValue={inputHistoryType}
                    onInputChange={(event, newInputValue) => {
                      setinputHistoryType(newInputValue);
                    }}
                  />

                  {medicationName == null}
                </Stack>
              </Grid>

              <Grid item xs={12} md={4}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="Observation">
                    Observation du médecin
                  </InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.observation && errors.observation)}
                    id="observation-add"
                    type="string"
                    name="observation"
                    value={values.observation}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Bien soignée"
                    inputProps={{}}
                  />
                  {touched.observation && errors.observation && (
                    <FormHelperText error id="helper-text-observation">
                      {errors.observation}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>

              <Grid item xs={12} md={4}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="dosage-add">
                    Dosage*
                  </InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.dosage && errors.dosage)}
                    id="dosage"
                    name="dosage"
                    value={values.dosage}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="+22899782841"
                    inputProps={{}}
                  />
                  {touched.dosage && errors.dosage && (
                    <FormHelperText error id="helper-text-dosage-add">
                      {errors.dosage}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid container item xs={4}>
                <AnimateButton>
                  <Button
                    disableElevation
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    onClick={() => OhandleSubmit(values)}
                    variant="contained"
                    color="primary"
                  >
                    Ajouter
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AddForm;
