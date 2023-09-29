import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
import { Navigate } from 'react-router-dom';
import AddPrescription from '../pages/components-overview/prescription/AddPrescription';
import ListPrescription from '../pages/components-overview/prescription/ListPrescription';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/SamplePage')));

// render - utilities
const Typography = Loadable(lazy(() => import('pages/components-overview/Typography')));
const Color = Loadable(lazy(() => import('pages/components-overview/Color')));
const Shadow = Loadable(lazy(() => import('pages/components-overview/Shadow')));
const AntIcons = Loadable(lazy(() => import('pages/components-overview/AntIcons')));

// render patient pages
const AddPatient = Loadable(lazy(() => import('pages/components-overview/patient/AddPatient')))
const ListPatient = Loadable(lazy(() => import('pages/components-overview/patient/ListPatient')))

//render consultation pages
const AddConsultation = Loadable(lazy(() => import('pages/components-overview/consultation/AddConsultation')));
const ListConsultation = Loadable(lazy(() => import('pages/components-overview/consultation/ListConsultation')));


// const AddOrdonnance = Loadable(lazy(() => import('pages/components-overview/ordonnance/AddOrdonance')));
// const ListOrdonnance = Loadable(lazy(() => import('pages/components-overview/ordonnance/ListOrdonnance')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    // { element: <Navigate to="/clinique" />, index: true },
    {
      path: '/',
      element: <DashboardDefault /> 
    },
    {
      path: 'color',
      element: <Color />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    },
    {
      path: 'shadow',
      element: <Shadow />
    },
    {
      path: 'typography',
      element: <Typography />
    },
    {
      path: 'icons/ant',
      element: <AntIcons />
    },
    {
      path: 'patient',
      children: [
        {
          path: 'ajouter',
          element: <AddPatient />
        },
        {
          path: 'lister',
          element: <ListPatient />
        }
      ]
    },
    {
      path: 'consultation',
      children: [
        {
          path: 'ajouter',
          element: <AddConsultation />
        },
        {
          path: 'lister',
          element: <ListConsultation />
        }
      ]
    },
    {
      path: 'ordonnance',
      children: [
        {
          path: 'ajouter',
          element: <AddPrescription />
        },
        {
          path: 'lister',
          element: <ListPrescription />
        }
      ]
    }
  ]
};

export default MainRoutes;
