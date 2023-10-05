import React from 'react'
import CardContent from 'themes/overrides/CardContent';
import Typography from 'themes/overrides/Typography';
import { Card } from '../../../../node_modules/@mui/material/index';

const ShowPatient = ({params}) => {
    alert('kk')
  return (
    <div>
        <Card md={12}>
 <CardContent md={12}>
     <Typography variant='h3'>Informations du patient</Typography>
     <div style={{ display: 'flex' }}>
         <div style={{ display: 'flex' }}>
             <pre>Nom:</pre>
             <pre> <b>{params.lastName}</b></pre>
         </div>
         <div style={{ display: 'flex', marginLeft: 35 }}>
             <pre>Prénom(s):</pre>
             <pre> <b>{params.firstName}</b></pre>
         </div>
         <div style={{ display: 'flex', marginLeft: 35 }}>
             <pre>Sex:</pre>
             <pre> <b>{params.sex}</b></pre>
         </div>
     </div>
     <div style={{ display: 'flex' }}>
         <div style={{ display: 'flex' }}>
             <pre>Situation matrimoniale:</pre>
             <pre> <b>{params.maritalStatus}</b></pre>
         </div>
         <div style={{ display: 'flex', marginLeft: 35 }}>
             <pre>Téléphone:</pre>
             <pre> <b>{params.phone}</b></pre>
         </div>
     </div>
 </CardContent>
</Card>
    </div>
  )
}

export default ShowPatient