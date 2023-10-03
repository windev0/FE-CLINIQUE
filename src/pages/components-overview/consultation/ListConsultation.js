import React, { useContext, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { GridToolbarContainer } from "@mui/x-data-grid/components/containers/GridToolbarContainer";
import { GridToolbarExport } from "@mui/x-data-grid/components/toolbar/GridToolbarExport";
import { IconButton, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { HISTORY_TYPE, REASONS } from "./AddForm";
import { ConsultationService } from "../../../provider/consultation.provider";
import { TableContext } from "../../context/PatientContext";
import { fDate, fDateSpaceTime } from "../../../utils/formatTime";

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
  // { field: "id", headerName: "ID", width: 70 },
  {
    field: "createdAt",
    headerName: "Date",
    sortable: true,
    width: 140,
  },
  { field: "patient", headerName: "Patient", width: 130 },
  { field: "reason", headerName: "Motif de la consultation", width: 200 },
  {
    field: "type",
    headerName: "Ant. Type maladie",
    width: 140,
  },
  {
    field: "startingDate",
    headerName: "Début du traitement",
    // description: "This column has a value getter and is not sortable.",
    sortable: true,
    width: 130,
    // editMode: "row",
    editable: true,
  },
  {
    field: "closingDate",
    headerName: "Fin du traitement",
    // description: "This column has a value getter and is not sortable.",
    sortable: true,
    width: 130,
    editMode: "row",
    editable: true,
  },
  {
    field: "phone",
    headerName: "Téléphone du patient",
    // description: "This column has a value getter and is not sortable.",
    sortable: true,
    width: 120,
  },
  {
    field: "actions",
    headerName: "Actions",
    sortable: false,
    width: 40,
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

export const rows = [
  {
    id: 1,
    patient: "Snow Jon",
    reason: REASONS[0].label,
    type: HISTORY_TYPE[0].label,
    startingDate: "2022-12-05",
    closingDate: "2022-12-05",
    phone: "+2258710078",
    actions: "r",
  },
  {
    id: 2,
    patient: "Lannister Cersei",
    reason: REASONS[1].label,
    type: HISTORY_TYPE[0].label,
    startingDate: "2022-12-05",
    closingDate: "2022-12-05",
    phone: "+2258710078",
    actions: "r",
  },
  {
    id: 3,
    patient: "Lannister Jaime",
    reason: REASONS[0].label,
    type: HISTORY_TYPE[2].label,
    startingDate: "2022-12-05",
    closingDate: "2022-12-05",
    phone: "+2258710078",
    actions: "r",
  },
  {
    id: 4,
    patient: "Stark Arya",
    reason: REASONS[0].label,
    type: HISTORY_TYPE[0].label,
    startingDate: "2022-12-05",
    closingDate: "2022-12-05",
    phone: "+2258710078",
    actions: "r",
  },
  {
    id: 5,
    patient: "Targaryen Daenerys",
    reason: REASONS[1].label,
    type: HISTORY_TYPE[3].label,
    startingDate: "2022-12-05",
    closingDate: "2022-12-05",
    phone: "+2258710078",
    actions: "r",
  },
  {
    id: 6,
    patient: "Melisandre Winner",
    reason: REASONS[2].label,
    type: HISTORY_TYPE[0].label,
    startingDate: "2022-12-05",
    closingDate: "2022-12-05",
    phone: "+2258710078",
    actions: "r",
  },
  {
    id: 7,
    patient: "Clifford Ferrara",
    reason: REASONS[3].label,
    type: HISTORY_TYPE[1].label,
    startingDate: "2022-12-05",
    closingDate: "2022-12-05",
    phone: "+2258710078",
    actions: "r",
  },
  {
    id: 8,
    patient: "Frances Rossini",
    reason: REASONS[2].label,
    type: HISTORY_TYPE[0].label,
    startingDate: "2022-12-05",
    closingDate: "2022-12-05",
    phone: "+2258710078",
    actions: "r",
  },
  {
    id: 9,
    patient: "Roxie Harvey",
    reason: REASONS[4].label,
    type: HISTORY_TYPE[5].label,
    startingDate: "2022-12-05",
    closingDate: "2022-12-05",
    phone: "+2258710078",
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
  const body = rows.map((item) => {
    const { createdAt, patient, type, reason, startingDate, phone, closingDate } = item;

    return [createdAt, patient, type, reason, startingDate, phone, closingDate];
  });
  const downloadList = () => {
    autoTable(patientsList, {
      head: [headerName],
      body: body,
    });
    patientsList.text("LISTE DES CONSULTATIONS", 14, 12);
    patientsList.text("", 14, 20);
    patientsList.save(`liste_des_consultations.pdf`);
  };

  return (
    <div>
      {/* <button
        type="button"
        onClick={() => downloadList()}
        style={{ backgroundColor: "#e2e8f0" }}
      >
        Télécharger la liste en PDF
      </button> */}
      <Button
        size="small"
        type="submit"
        variant="contained"
        color="primary"
        onClick={() => downloadList()}
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
const ListConsultation = () => {
  const [consultations, setConsultations] = useState([]);

  useEffect(() => {
    getConsultations();
  }, []);

  const getConsultations = () => {
    ConsultationService.getConsultations().then((res) => {
      if (res && Array.isArray(res)) {
        setConsultations(res);
      }
    });
  };
  const fullname = (patient) => {
    if (patient) return `${patient.firstName} ${patient.lastName}`;
  };
  const formatConsultations = consultations?.map((consult) => ({
    id: consult.id,
    reason: consult.reason,
    patient: fullname(consult.patient),
    type: consult.history?.type,
    phone: consult.patient?.phone,
    startingDate: fDate(consult.history?.startingDate),
    closingDate: fDate(consult.history?.closingDate),
    observation: consult.history?.observation,
    description: consult.history?.description,
    createdAt: fDateSpaceTime(consult.createdAt)
  }));
  return (
    <TableContext.Provider value={{ rows: formatConsultations }}>
      <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          slots={{
            toolbar: CustomToolbar,
          }}
          editMode="row"
          rows={formatConsultations}
          columns={columns}
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

export default ListConsultation;
