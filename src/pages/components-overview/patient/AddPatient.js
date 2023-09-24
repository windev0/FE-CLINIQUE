import React, { useState, useEffect } from 'react';
import { strengthColor, strengthIndicator } from 'utils/password-strength';

import { Link as RouterLink } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Button,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
  Stack,
  Select
} from '@mui/material';
import { MenuItem } from '../../../../node_modules/@mui/material/index';
import AnimateButton from 'components/@extended/AnimateButton';
import { GridToolbarContainer } from '../../../../node_modules/@mui/x-data-grid/components/containers/GridToolbarContainer';

const AddPatient = () => {

  const [level, setLevel] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const USER_SEX = {
    MALE: 'MASCULIN',
    FEMALE: 'FEMININ'
  };

  const MARITAL_STATUS = {
    WINDOW: 'VEUF(VE)',
    MARRIED: 'MARIE(E)',
    SINGLE: 'CELIBATAIRE',
    OTHER: 'AUTRE',
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setLevel(strengthColor(temp));
  };

  const handleType = (type) => {
    return type;
  }
  useEffect(() => {
    changePassword('');
  }, []);

  const OhandleSubmit = (patient) => {
    axios.post('http://localhost:3001/patient', patient)
      .then((response) => console.log(response))
      .catch(function (error) {
        console.log(error);
      });
  }

  // const CustomButton = () => {
  //   return <div>
  //     <Button fullWidth size="large" type="button" onClick={() => null} color="secondary">
  //       Ajouter une consultation
  //     </Button>
  //   </div>
  // }

  // const CustomToolBar = () => {
  //   return <GridToolbarContainer>
  //     <Grid container item xs={12} md={4}>
  //       <CustomButton />
  //     </Grid>
  //   </GridToolbarContainer>
  // }

  return (
    <> 
      <div>

        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            birthDate: '',
            birthPlace: '',
            sex: '',
            phone: '',
            emergencyContact: '',
            maritalStatus: '',
            address: '',
            nationality: '',
            identity: {},
            constant: {},
            job: ''
          }}
          validationSchema={Yup.object().shape({
            firstName: Yup.string().max(255).required('Le nom est obligatoire'),
            lastName: Yup.string().max(255).required('Le prénom est obligatoire'),
            birthPlace: Yup.string().max(255).required("Lieu de naissance est obligatoire"),
            email: Yup.string().email('Doit etre un email valide').max(255),
            nationality: Yup.string().max(255),
            job: Yup.string().max(255),
            address: Yup.string().max(255).required('L\'adresse est obligatoire'),
            sex: Yup.string().max(255).required('Le sexe est obligatoire'),
            emergencyContact: Yup.string().max(255).required('Ce champ est obligatoire'),
            emergencyContact: Yup.string().max(255).required('Le numéro de téléphone est obligatoire'),
            maritalStatus: Yup.string().max(255).required('Ce champ est obligatoire'),
            birthDate: Yup.date()
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
          {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
            <form noValidate onSubmit={handleSubmit} method='POST' action='submit'>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="firstName-add">Nom*</InputLabel>
                    <OutlinedInput
                      id="firstName-login"
                      type="firstName"
                      value={values.firstName}
                      name="firstName"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="AWOUNO"
                      fullWidth
                      error={Boolean(touched.firstName && errors.firstName)} />
                    {touched.firstName && errors.firstName && (
                      <FormHelperText error id="helper-text-firstName-add">
                        {errors.firstName}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="lastName-add">Prénom(s)*</InputLabel>
                    <OutlinedInput
                      fullWidth
                      error={Boolean(touched.lastName && errors.lastName)}
                      id="lastName-add"
                      type="lastName"
                      value={values.lastName}
                      name="lastName"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Kosi Winner"
                      inputProps={{}} />
                    {touched.lastName && errors.lastName && (
                      <FormHelperText error id="helper-text-lastName-add">
                        {errors.lastName}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="lastName-add">Date de naissance*</InputLabel>
                    <OutlinedInput
                      fullWidth
                      error={Boolean(touched.birthDate && errors.birthDate)}
                      id="birthDate-add"
                      type="date"
                      value={values.lastName}
                      name="birthDate"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      inputProps={{}} />
                    {touched.birthDate && errors.birthDate && (
                      <FormHelperText error id="helper-text-birthDate-add">
                        {errors.birthDate}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid spacing={3} item xs={12} md={3}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="address-add">Address</InputLabel>
                    <OutlinedInput
                      fullWidth
                      error={Boolean(touched.address && errors.address)}
                      id="address-add"
                      value={values.address}
                      name="address"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Kodjoviakopé"
                      inputProps={{}} />
                    {touched.address && errors.address && (
                      <FormHelperText error id="helper-text-address-add">
                        {errors.address}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="Type-add">Sexe*</InputLabel>
                    <Select fullWidth
                      labelId="sex"
                      id="sex-add"
                      // value=
                      label="sex"
                      name="sex"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      inputProps={{}}
                    >
                      <MenuItem value={handleType(USER_SEX.MALE)}>{USER_SEX.MALE}</MenuItem>
                      <MenuItem value={handleType(USER_SEX.FEMALE)}>{USER_SEX.FEMALE}</MenuItem>
                    </Select>

                    {touched.type && errors.type && (
                      <FormHelperText error id="helper-text-type-add">
                        {errors.type}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="Type-add">Situation matrimoniale*</InputLabel>
                    <Select fullWidth
                      labelId="maritalStatus"
                      id="sex-add"
                      // value=
                      label="maritalStatus"
                      name="maritalStatus"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      inputProps={{}}
                    >
                      <MenuItem value={handleType(MARITAL_STATUS.MARRIED)}>{MARITAL_STATUS.MARRIED}</MenuItem>
                      <MenuItem value={handleType(MARITAL_STATUS.SINGLE)}>{MARITAL_STATUS.SINGLE}</MenuItem>
                      <MenuItem value={handleType(MARITAL_STATUS.WINDOW)}>{MARITAL_STATUS.WINDOW}</MenuItem>
                      <MenuItem value={handleType(MARITAL_STATUS.OTHER)}>{MARITAL_STATUS.OTHER}</MenuItem>
                    </Select>

                    {touched.maritalStatus && errors.maritalStatus && (
                      <FormHelperText error id="helper-text-type-add">
                        {errors.maritalStatus}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="address-add">Contact de la personne à prévenir*</InputLabel>
                    <OutlinedInput
                      fullWidth
                      error={Boolean(touched.address && errors.address)}
                      id="address-add"
                      // value={}
                      name="emergencyContact"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="+22899782841"
                      inputProps={{}} />
                    {touched.address && errors.address && (
                      <FormHelperText error id="helper-text-address-add">
                        {errors.address}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={4}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="nationality-add">Nationalité</InputLabel>
                    <OutlinedInput
                      fullWidth
                      error={Boolean(touched.job && errors.job)}
                      id="nationality-add"
                      type="string"
                      name="nationality"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Togolaise"
                      inputProps={{}} />
                    {touched.nationality && errors.nationality && (
                      <FormHelperText error id="helper-text-job-add">
                        {errors.nationality}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={4}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="job-add">Profession</InputLabel>
                    <OutlinedInput
                      fullWidth
                      error={Boolean(touched.job && errors.job)}
                      id="job-add"
                      value=''
                      type="string"
                      name="job"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Enseignant"
                      inputProps={{}} />
                    {touched.job && errors.job && (
                      <FormHelperText error id="helper-text-job-add">
                        {errors.job}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="phone-add">Téléphone*</InputLabel>
                    <OutlinedInput
                      fullWidth
                      error={Boolean(touched.phone && errors.phone)}
                      id="phone-add"
                      name="phone"
                      value=''
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="+22899782841"
                      inputProps={{}} />
                    {touched.phone && errors.phone && (
                      <FormHelperText error id="helper-text-phone-add">
                        {errors.phone}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={2}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="constants-add">Poids*</InputLabel>
                    <OutlinedInput
                      fullWidth
                      error={Boolean(touched.job && errors.job)}
                      id="weight-add"
                      type="number"
                      name="weight"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="15"
                      inputProps={{}} />
                    {touched.nationality && errors.nationality && (
                      <FormHelperText error id="helper-text-job-add">
                        {errors.nationality}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={2}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="constants-add">Taille*</InputLabel>
                    <OutlinedInput
                      fullWidth
                      error={Boolean(touched.job && errors.job)}
                      id="weight-add"
                      type="number"
                      name="height"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="1.54"
                      inputProps={{}} />
                    {touched.nationality && errors.nationality && (
                      <FormHelperText error id="helper-text-job-add">
                        {errors.nationality}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid spacing={2} item xs={2}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="constants-add">Température*</InputLabel>
                    <OutlinedInput
                      fullWidth
                      error={Boolean(touched.job && errors.job)}
                      id="weight-add"
                      type="number"
                      name="temperature"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="1.54"
                      inputProps={{}} />
                    {touched.nationality && errors.nationality && (
                      <FormHelperText error id="helper-text-job-add">
                        {errors.nationality}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={3}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="constants-add">Pression artérielle</InputLabel>
                    <OutlinedInput
                      fullWidth
                      error={Boolean(touched.job && errors.job)}
                      id="weight-add"
                      type="number"
                      name="temperature"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="1.54"
                      inputProps={{}} />
                    {touched.nationality && errors.nationality && (
                      <FormHelperText error id="helper-text-job-add">
                        {errors.nationality}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={3}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="constants-add">Fr&quence cardiaque</InputLabel>
                    <OutlinedInput
                      fullWidth
                      error={Boolean(touched.job && errors.job)}
                      id="weight-add"
                      type="number"
                      name="heartRate"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="1.54"
                      inputProps={{}} />
                    {touched.nationality && errors.nationality && (
                      <FormHelperText error id="helper-text-job-add">
                        {errors.nationality}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                {errors.submit && (
                  <Grid item xs={4}>
                    <FormHelperText error>{errors.submit}</FormHelperText>
                  </Grid>
                )}
                <Grid container item xs={2}>
                  <AnimateButton>
                    <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" onClick={() => OhandleSubmit(values)} variant="contained" color="primary">
                      Ajouter
                    </Button>
                  </AnimateButton>
                </Grid>

              </Grid>

            </form>
          )}
        </Formik>
      </div></>
  )
}

export default AddPatient