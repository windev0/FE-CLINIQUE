import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { GridToolbarContainer } from '../../../../node_modules/@mui/x-data-grid/components/containers/GridToolbarContainer';
import { GridToolbarExport } from '../../../../node_modules/@mui/x-data-grid/components/toolbar/GridToolbarExport';
import { IconButton } from '../../../../node_modules/@mui/material/index';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';

const handleEditClick = (id) => {
  // Ajoutez votre logique pour gérer l'édition d'une ligne avec l'ID donné.
  // Par exemple, vous pouvez ouvrir un dialogue d'édition.
  console.log(`Edit row with ID: ${id}`);
};

const handleDeleteClick = (id) => {
  // Ajoutez votre logique pour gérer la suppression d'une ligne avec l'ID donné.
  console.log(`Delete row with ID: ${id}`);
};


const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'Nom', width: 130 },
  { field: 'lastName', headerName: 'Prénom(s)', width: 130 },
  {
    field: 'age',
    headerName: 'Sexe',
    width: 90,
  },
  {
    field: 'maritalStatus',
    headerName: 'Situation matrimoniale',
    description: 'This column has a value getter and is not sortable.',
    sortable: true,
    width: 160,
    editMode: "row",
    editable: true

  },
  {
    field: 'phone',
    headerName: 'Numéro de téléphone',
    description: 'This column has a value getter and is not sortable.',
    sortable: true,
    width: 160,

  },
  {
    field: 'date',
    headerName: "Date d'ajout",
    description: 'This column has a value getter and is not sortable.',
    sortable: true,
    width: 160,

  },
  {
    field: 'actions',
    headerName: 'Actions',
    sortable: false,
    width: 160,
    renderCell: (params) => (
      <>
        <IconButton
          color="primary"
          aria-label="Edit"
          component="span"
          onClick={() => handleEditClick(params.id)}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          color="red"
          aria-label="Delete"
          component="span"
          onClick={() => handleDeleteClick(params.id)}
        >
          <DeleteIcon />
        </IconButton>
      </>
    ),
  }

];

const rows = [
  {
    id: 1, lastName: 'Snow', firstName: 'Jon', age: 'M', maritalStatus: 'CELIBATAIRE', phone: '+22899744582', date: '2022-02-05', actions: 'r'
  },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 'F', maritalStatus: 'VEUF(VE)', phone: '+22899744582', date: '2022-02-05', actions: 'r' },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 'M', maritalStatus: 'CELIBATAIRE', phone: '+22899744582', date: '2022-02-05', actions: 'r' },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 'F', maritalStatus: 'MARIE(E)', phone: '+22899744582', date: '2022-02-05', actions: 'r' },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: 'F', maritalStatus: 'CELIBATAIRE', phone: '+22899744582', date: '2022-02-05', actions: 'r' },
  { id: 6, lastName: 'Melisandre', firstName: 'Winner', age: 'M', maritalStatus: 'MARIE(E)', phone: '+22899744582', date: '2022-02-05', actions: 'r' },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 'M', maritalStatus: 'CELIBATAIRE', phone: '+22899744582', date: '2022-02-05', actions: 'r' },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 'F', maritalStatus: 'VEUF(VE)', phone: '+22899744582', date: '2022-02-05', actions: 'r' },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 'F', maritalStatus: 'MARIE(E)', phone: '+22899744582', date: '2022-02-05', actions: 'r' },
];

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />

    </GridToolbarContainer>
  );
}
const ListPatient = () => {
  return (
    <><div style={{ height: 500, width: '100%' }}>
      <DataGrid
        slots={{
          toolbar: CustomToolbar,
        }}
        editMode="row"
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 7 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection />
    </div></>
  );
}

export default ListPatient;
