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
  Card
} from "@mui/material";
import AnimateButton from "components/@extended/AnimateButton";
// import { rows } from "../patient/ListConsultation";

import { ConsultationService } from "../../../provider/consultation.provider";
import swal from "../../../assets/sweet.alert";
import { TableContext } from "../../context/PatientContext";

export const REASONS = [
  { label: "EXAMENS DE ROUTINE" },
  { label: "PROBLEMES DE SANTE COURANTS" },
  { label: "PROBLEMES DE PEAU" },
  { label: "SANTE MENTALE" },
  { label: "AFFECTIONS CHRONIQUES" },
  { label: "BLESSURES" },
  { label: "CONSULTATIONS SPECIALISEES" },
  { label: "GROSSESSE" },
  { label: "SANTE DENTAIRE" },
  { label: "SOINS GERIATRIQUES" },
];

export const HISTORY_TYPE = [
  { label: "PATHOLOGIQUE" },
  { label: "CHIRURGICAL" },
  { label: "ALLERGIE MÉDICAMENTEUSE" },
  { label: "GYNÉCO-OBSTÉTRIQUE" },
  { label: "ANTECÉDENTS FAMILIAUX" },
  { label: "UROGÉNITAL" },
  { label: "PARA-CLINIQUE" },
  { label: "ACTIVITÉ SEXUELLE" },
  { label: "HYGIÉNO-DIÉTÉTIQUE" },
  { label: "AUTRE" },
];
const AddForm = ({ patientId }) => {
  const navigate = useNavigate()

  const [reason, setReason] = useState(REASONS[0]);
  const [inputReason, setInputReason] = useState("");
  const [historyType, setHistoryType] = useState(HISTORY_TYPE[0]);
  const [inputHistoryType, setinputHistoryType] = useState("");
  const { patients } = useContext(TableContext);

  const OhandleSubmit = (data) => {
    const history = {
      startingDate: data.startingDate,
      closingDate: data.closingDate,
      description: data.description,
      observation: data.observation,
      type: historyType.label,
    };

    ConsultationService.createConsultation({ ...data, patientId, history })
      .then((resp) => {
        console.log("Consultation ===", resp);
        if (resp) {
          {swal(`Consultation ajouté`, "", "success");}
          navigate("/consultation/lister");
        }
      })
      .catch((error) => {
        console.log('ERROR::===', error)
        {swal(`Une erreur s'est produite. Veuillez réessayer!`, "", "error");}
      });
  };

  if (patientId == null) {
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
  const patient = patients?.find((patient) => patient.id === patientId);
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
          phone: "+22890202031",
          reason: "CONSULTATIONS SPECIALISEES",
          startingDate: new Date(2023, 8, 30),
          closingDate: new Date(2023, 9, 15),
          description: "Une description de routine",
          observation: "Une simple observation",
          type: "RADIOGRAPHIE",
        }}
        validationSchema={Yup.object().shape({
          reason: Yup.string().max(255).required("Ce champ est obligatoire"),
          type: Yup.string().max(255).required("Ce champ est obligatoire"),
          description: Yup.string()
            .max(255)
            .required("Ce champ est obligatoire"),
          observation: Yup.string()
            .max(255)
            .required("Ce champ est obligatoire"),
          startingDate: Yup.date().required("La date de début est obligatoire"),
          closingDate: Yup.date().required("La date de fin est obligatoire"),
          phone: Yup.string().max(20).required("Ce champ est obligatoire"),
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
                    id="reason"
                    options={REASONS}
                    // sx={{ width: 400 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Motif de la consultation" />
                    )}
                    value={reason ? reason : inputReason}
                    onChange={(event, newValue) => {
                      setReason(newValue);
                    }}
                    inputValue={inputReason}
                    onInputChange={(event, newInputValue) => {
                      setInputReason(newInputValue);
                    }}
                  />

                  {{ reason } == null || { inputReason } == null}
                  {/* <FormHelperText error id="reason">
                                        {errors.reason}
                                    </FormHelperText> */}
                </Stack>
              </Grid>
              <Grid item xs={12} md={12}>
                <InputLabel htmlFor="">
                  {" "}
                  <h2>ANTECEDENTS MEDICAUX</h2>
                </InputLabel>
              </Grid>
              <Grid item xs={12} md={4}>
                <Stack spacing={1}>
                  <Autocomplete
                    style={{ marginTop: 15 }}
                    disablePortal
                    id="history"
                    required={true}
                    options={HISTORY_TYPE}
                    name="type"
                    // sx={{ width: 320 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Type de maladie" />
                    )}
                    value={historyType ? historyType : inputHistoryType}
                    onChange={(event, newValue) => {
                      setHistoryType(newValue);
                    }}
                    inputValue={inputHistoryType}
                    onInputChange={(event, newInputValue) => {
                      setinputHistoryType(newInputValue);
                    }}
                  />

                  {{ historyType } == null}
                  {/* <FormHelperText error id="history">
                                        {errors.historyType}
                                    </FormHelperText> */}
                </Stack>
              </Grid>

              <Grid item xs={12} md={4}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="startingDate">
                    Date de début du traitement
                  </InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.startingDate && errors.startingDate)}
                    id="starting-add"
                    type="date"
                    value={values.startingDate}
                    name="startingDate"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    inputProps={{}}
                  />
                  {touched.startingDate && errors.startingDate && (
                    <FormHelperText error id="helper-text-startingDate">
                      {errors.startingDate}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12} md={4}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="closingDate">
                    Date de fin du traitement
                  </InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.closingDate && errors.closingDate)}
                    id="closingDate-add"
                    type="date"
                    value={values.closingDate}
                    name="closingDate"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    inputProps={{}}
                  />
                  {touched.closingDate && errors.closingDate && (
                    <FormHelperText error id="helper-text-closingDate">
                      {errors.closingDate}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={4}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="description-add">
                    Description sur la maladie
                  </InputLabel>
                  <OutlinedInput
                    fullWidth
                    width={400}
                    error={Boolean(touched.description && errors.description)}
                    id="description-add"
                    type="string"
                    name="description"
                    value={values.description}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Très contagieux"
                    inputProps={{}}
                  />
                  {touched.description && errors.description && (
                    <FormHelperText error id="helper-text-description">
                      {errors.description}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={4}>
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

              <Grid item xs={4} md={4}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="phone-add">
                    Téléphone du médecin soignant*
                  </InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.phone && errors.phone)}
                    id="phone"
                    name="phone"
                    value={values.phone}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="+22899782841"
                    inputProps={{}}
                  />
                  {touched.phone && errors.phone && (
                    <FormHelperText error id="helper-text-phone-add">
                      {errors.phone}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid container item xs={2}>
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
