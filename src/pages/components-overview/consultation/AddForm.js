import React, { useState } from 'react'

import { USER_SEX, MARITAL_STATUS } from '../patient/AddPatient';
import * as Yup from 'yup';
import { Formik } from 'formik';
import Typography from '@mui/material/Typography';
import {
    Button,
    FormHelperText,
    Grid,
    InputLabel,
    OutlinedInput,
    Stack,
    Select
} from '@mui/material';
import { Card, MenuItem } from '../../../../node_modules/@mui/material/index';
import CardContent from '@mui/material/CardContent';
import AnimateButton from 'components/@extended/AnimateButton';
import { rows } from '../patient/ListPatient';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';



export const REASONS = [
    { label: 'EXAMENS DE ROUTINE', },
    { label: 'PROBLEMES DE SANTE COURANTS', },
    { label: 'PROBLEMES DE PEAU', },
    { label: 'SANTE MENTALE', },
    { label: 'AFFECTIONS CHRONIQUES', },
    { label: 'BLESSURES', },
    { label: 'CONSULTATIONS SPECIALISEES' },
    { label: 'GROSSESSE' },
    { label: 'SANTE DENTAIRE' },
    { label: 'SOINS GERIATRIQUES' },
]

export const HISTORY_TYPE = {

}
const AddForm = ({ patientId }) => {
    const handleType = (type) => {
        return type;
    }

    const [reason, setReason] = useState(REASONS[0]);
    const [inputReason, setInputReason] = useState('');
    const [historyType, setHistoryType] = useState(HISTORY_TYPE[0]);
    const [inputHistoryType, setinputHistoryType] = useState('');

    console.log('valeur', patientId)
    if (patientId == null) {
        return <div>
            <Card>
                <CardContent>
                    <Typography variant='h6' style={{ textAlign: 'center' }}>Aucun patient trouvé</Typography>
                </CardContent>
            </Card>
        </div>
    }
    const patient = rows.find(patient => patient.id === patientId)

    return (
        <>
            <div >
                <Card>
                    <CardContent>
                        <Typography variant='h3'>Informations du patient</Typography>
                        <div style={{ display: 'flex' }}>
                            <div style={{ display: 'flex' }}>
                                <pre>Nom:</pre>
                                <pre> <b>{patient.lastName}</b></pre>
                            </div>
                            <div style={{ display: 'flex', marginLeft: 35 }}>
                                <pre>Prénom(s):</pre>
                                <pre> <b>{patient.firstName}</b></pre>
                            </div>
                            <div style={{ display: 'flex', marginLeft: 35 }}>
                                <pre>Sex:</pre>
                                <pre> <b>{patient.sex}</b></pre>
                            </div>
                        </div>
                        <div style={{ display: 'flex' }}>
                            <div style={{ display: 'flex' }}>
                                <pre>Situation matrimoniale:</pre>
                                <pre> <b>{patient.maritalStatus}</b></pre>
                            </div>
                            <div style={{ display: 'flex', marginLeft: 35 }}>
                                <pre>Téléphone:</pre>
                                <pre> <b>{patient.phone}</b></pre>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div style={{ marginBottom: 45 }}></div>
            <Formik
                initialValues={{
                    reason: '',
                    historyType: '',
                    startingDate: '',
                    closingDate: '',
                    description: '',
                    observation: '',

                }}
                validationSchema={Yup.object().shape({
                    reason: Yup.string().max(255).required('Ce champ est obligatoire'),
                    historyType: Yup.string().max(255).required('Ce champ est obligatoire'),
                    description: Yup.string().max(255).required('Ce champ est obligatoire'),
                    observation: Yup.string().max(255).required('Ce champ est obligatoire'),
                    startingDate: Yup.date().required('La date de début est obligatoire'),
                    closingDate: Yup.date().required('La date de fin est obligatoire')
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
                                    <Autocomplete style={{ marginBottom: '3' }}
                                        disablePortal
                                        id="combo-box-demo"
                                        options={REASONS}
                                        sx={{ width: 300 }}
                                        renderInput={(params) => <TextField {...params} label="Motif de la consultation" />}
                                        value={reason ? reason : inputReason}
                                        onChange={(event, newValue) => {
                                            setReason(newValue);
                                        }}
                                        inputValue={inputReason}
                                        onInputChange={(event, newInputValue) => {
                                            setInputReason(newInputValue);
                                        }}

                                    />

                                    {{ reason }== null || { inputReason } == null}
                                    <FormHelperText error id="reason">
                                        {errors.reason}
                                    </FormHelperText>

                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Stack spacing={1}>
                                    <Autocomplete style={{ marginBottom: '3' }}
                                        disablePortal
                                        id="combo-box-demo"
                                        options={REASONS}
                                        sx={{ width: 300 }}
                                        renderInput={(params) => <TextField {...params} label="Antécédent - Type de maladie" />}
                                        value={reason ? reason : inputReason}
                                        onChange={(event, newValue) => {
                                            setReason(newValue);
                                        }}
                                        inputValue={inputReason}
                                        onInputChange={(event, newInputValue) => {
                                            setInputReason(newInputValue);
                                        }}

                                    />

                                    {{ reason }== null || { inputReason } == null}
                                    <FormHelperText error id="reason">
                                        {errors.reason}
                                    </FormHelperText>

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
        </>
    )
}

export default AddForm;