import { createContext, useEffect, useState } from "react";
import axios from "../../../node_modules/axios/index";

export const PATIENT_CONTEXT = createContext();

const PatientProvider = ({ children }) => {

    const [patients, setPatients] = useState();
    const [message, setMessage] = useState('');
    useEffect(() => {
        axios.get('http://localhost:3001/patient', {
            withCredentials: true,
        })
            .then((response) => { setPatients(response.data) })
            .catch(function (error) {
                console.log(error);
            });

    }, []);
    const values = { patients, message, setMessage };
    return (< PATIENT_CONTEXT.Provider value={values} > {children}</PATIENT_CONTEXT.Provider>);
}

export default PatientProvider;