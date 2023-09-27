import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { rows } from '../patient/ListPatient';
import AddForm from './AddForm';
const AddConsultation = () => {

    const patientsName = rows.map((item) => {
        const { firstName, lastName, id } = item
        return { label: `${firstName} ${lastName}`, id: id }
    })

    const [value, setValue] = useState();
    const [inputValue, setInputValue] = useState('');
    return (
        <><Autocomplete style={{marginBottom : '3'}}
            disablePortal
            id="combo-box-demo"
            options={patientsName}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Rechercher un patient" />}
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
            }}
        />
        <div style={{marginBottom : 15}}></div>
            <AddForm patientId={value? value.id : null} />

        </>
    )
}

export default AddConsultation;