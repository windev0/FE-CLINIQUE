import React from 'react'
import axios from '../../../node_modules/axios/index'

const Logout = () => {
    axios.post('http://localhost:3001/auth/logout').then((response) => console.log(response)).catch((error) => console.log(error))
    return (
        <div>Logout</div>
    )
}

export default Logout