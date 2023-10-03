import React, { useContext, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { GridToolbarContainer } from "@mui/x-data-grid/components/containers/GridToolbarContainer";
import { GridToolbarExport } from "@mui/x-data-grid/components/toolbar/GridToolbarExport";
import { IconButton, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { TableContext } from "../../context/PatientContext";
import { fDate, fDateSpaceTime } from "../../../utils/formatTime";
import { PrescriptionService } from "../../../provider/prescription.provider";

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
  {
    field: "type",
    headerName: "Type",
    width: 140,
  },
  { field: "reason", headerName: "Motif de la consultation", width: 200 },
  {
    field: "name",
    headerName: "Médicament",
    // description: "This column has a value getter and is not sortable.",
    sortable: true,
    width: 140,
  },
  {
    field: "dosage",
    headerName: "Dosage",
    // description: "This column has a value getter and is not sortable.",
    sortable: true,
    width: 200,
    editMode: "row",
    editable: true,
  },
  {
    field: "observation",
    headerName: "Observation",
    // description: "This column has a value getter and is not sortable.",
    sortable: true,
    width: 200,
    editMode: "row",
    editable: true,
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
      </>
    ),
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
    const { createdAt, patient, type, reason, dosage, name, observation } = item;

    return [createdAt, patient, type, reason, dosage, name, observation];
  });
  const downloadList = () => {
    autoTable(patientsList, {
      head: [headerName],
      body: body,
    });
    patientsList.text("LISTE DES ORDONNANCES", 14, 12);
    patientsList.text("", 14, 20);
    patientsList.save(`liste_des_ordonnances.pdf`);
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
const ListPrescription = () => {
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    getPrescriptions();
  }, []);

  const getPrescriptions = () => {
    PrescriptionService.getPrescriptions().then((res) => {
      if (res && Array.isArray(res)) {
        setPrescriptions(res);
      }
    });
  };
  const fullname = (patient) => {
    if (patient) return `${patient.firstName} ${patient.lastName}`;
  };
  const formatPrescriptions = prescriptions?.map((ordo) => ({
    id: ordo.id,
    reason: ordo.consultation?.reason,
    patient: fullname(ordo?.consultation?.patient),
    type: ordo?.type,
    name: ordo.medication?.name,
    dosage: ordo.medication?.dosage,
    observation: ordo?.observation,
    createdAt: fDateSpaceTime(ordo.createdAt)
  }));
  return (
    <TableContext.Provider value={{ rows: formatPrescriptions }}>
      <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          slots={{
            toolbar: CustomToolbar,
          }}
          editMode="row"
          rows={formatPrescriptions}
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

export default ListPrescription;
