import React, { createContext, useContext, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { GridToolbarContainer } from "@mui/x-data-grid/components/containers/GridToolbarContainer";
import { GridToolbarExport } from "@mui/x-data-grid/components/toolbar/GridToolbarExport";
import { IconButton, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { PatientService } from "../../../provider/patient.provider";
import { TableContext } from "../../context/PatientContext";
import { fDate } from "../../../utils/formatTime";

const handleEditClick = (id) => {
  // Ajoutez votre logique pour gérer l'édition d'une ligne avec l'ID donné.
  // Par exemple, vous pouvez ouvrir un dialogue d'édition.
  console.log(`Edit row with ID: ${id}`);
  // appeler le component et lui passer le id
};

// const handleDeleteClick = (id) => {
//   rows = rows.filter((item) => item.id != id);
// };
const handleDeleteClick = (patients, id) => {
  return patients.filter((item) => item.id != id);
};

const columns = [
  // { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "Nom", width: 130 },
  { field: "lastName", headerName: "Prénom(s)", width: 130 },
  { field: "job", headerName: "Profession", width: 110 },
  {
    field: "sex",
    headerName: "Sexe",
    width: 90,
  },
  {
    field: "maritalStatus",
    headerName: "Situation matrimoniale",
    // description: "This column has a value getter and is not sortable.",
    sortable: true,
    width: 160,
    editMode: "row",
    editable: true,
  },
  {
    field: "phone",
    headerName: "Numéro de téléphone",
    // description: "This column has a value getter and is not sortable.",
    sortable: true,
    width: 160,
  },
  {
    field: "createdAt",
    headerName: "Date d'ajout",
    // description: "This column has a value getter and is not sortable.",
    sortable: true,
    width: 160,
  },
  {
    field: "actions",
    headerName: "Actions",
    sortable: false,
    width: 80,
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
        {/* <IconButton
          color="red"
          aria-label="Delete"
          component="span"
          onClick={() => handleDeleteClick(params.id)}
        >
          <DeleteIcon />
        </IconButton> */}
      </>
    ),
  },
];

export let rows = [
  {
    id: 1,
    lastName: "Snow",
    firstName: "Jon",
    sex: "M",
    maritalStatus: "CELIBATAIRE",
    phone: "+22899744582",
    date: "2022-02-05",
    actions: "r",
  },
  {
    id: 2,
    lastName: "Lannister",
    firstName: "Cersei",
    sex: "F",
    maritalStatus: "VEUF(VE)",
    phone: "+22899744582",
    date: "2022-02-05",
    actions: "r",
  },
  {
    id: 3,
    lastName: "Lannister",
    firstName: "Jaime",
    sex: "M",
    maritalStatus: "CELIBATAIRE",
    phone: "+22899744582",
    date: "2022-02-05",
    actions: "r",
  },
  {
    id: 4,
    lastName: "Stark",
    firstName: "Arya",
    sex: "F",
    maritalStatus: "MARIE(E)",
    phone: "+22899744582",
    date: "2022-02-05",
    actions: "r",
  },
  {
    id: 5,
    lastName: "Targaryen",
    firstName: "Daenerys",
    sex: "F",
    maritalStatus: "CELIBATAIRE",
    phone: "+22899744582",
    date: "2022-02-05",
    actions: "r",
  },
  {
    id: 6,
    lastName: "Melisandre",
    firstName: "Winner",
    sex: "M",
    maritalStatus: "MARIE(E)",
    phone: "+22899744582",
    date: "2022-02-05",
    actions: "r",
  },
  {
    id: 7,
    lastName: "Clifford",
    firstName: "Ferrara",
    sex: "M",
    maritalStatus: "CELIBATAIRE",
    phone: "+22899744582",
    date: "2022-02-05",
    actions: "r",
  },
  {
    id: 8,
    lastName: "Frances",
    firstName: "Rossini",
    sex: "F",
    maritalStatus: "VEUF(VE)",
    phone: "+22899744582",
    date: "2022-02-05",
    actions: "r",
  },
  {
    id: 9,
    lastName: "Roxie",
    firstName: "Harvey",
    sex: "F",
    maritalStatus: "MARIE(E)",
    phone: "+22899744582",
    date: "2022-02-05",
    actions: "r",
  },
];

function PDF() {
  const { rows } = useContext(TableContext);
  const patientsList = new jsPDF();
  const headerName = columns.map((item, index) => {
    const isLastIteration = index === columns.length - 1;
    const { headerName } = item;

    if (!isLastIteration) {
      return [headerName];
    }
  });
  const body = rows?.map((item) => {
    const {firstName, lastName,  job, sex, maritalStatus, phone, createdAt } =
      item;

    return [firstName, lastName, job, sex, maritalStatus, phone, createdAt];
  });
  const downloadList = () => {
    autoTable(patientsList, {
      head: [headerName],
      body: body,
    });
    patientsList.text("LISTE DES PATIENTS", 14, 12);
    patientsList.text("", 14, 20);
    patientsList.save("liste_des_patients.pdf");
  };

  return (
    <div>
      <Button
        size="small"
        type="submit"
        variant="contained"
        color="primary"
        onClick={() => downloadList()}
        // style={{ backgroundColor: "#e2e8f0" }}
      >
        Télécharger la liste en PDF
      </Button>
    </div>
  );
}
export function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
      <PDF />
    </GridToolbarContainer>
  );
}
const ListPatient = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    getPatients();
  }, []);

  const getPatients = () => {
    PatientService.getPatients().then((res) => {
      if (res && Array.isArray(res)) {
        res.map((patient) => {
          patient.createdAt = fDate(patient.createdAt);
          return patient;
        })
        setPatients(res);
      }
    });
  };
  const newColumns = columns.filter((col) => col.field !== "id");
  return (
    <TableContext.Provider value={{ rows: patients }}>
      <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          slots={{
            toolbar: CustomToolbar,
          }}
          editMode="row"
          rows={patients}
          columns={newColumns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 7 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </div>
    </TableContext.Provider>
  );
};

export default ListPatient;
