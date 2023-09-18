// project import
import Consultation from './consultation.pages';
import dashboard from './dashboard';
import Ordonnance from './ordonnances.pages';

import patientPages from './patient.pages';

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
  items: [dashboard, patientPages, Consultation, Ordonnance]
};

export default menuItems;
