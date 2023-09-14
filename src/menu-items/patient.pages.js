// assets
import { LoginOutlined, ProfileOutlined } from '@ant-design/icons';

// icons
const icons = {
    LoginOutlined,
    ProfileOutlined
};

const PatientPages = {
    id: 'patient',
    title: 'Gestion des patients',
    type: 'group',
    children: [
        {
            id: 'ajouter',
            title: 'Ajouter un patient',
            type: 'item',
            url: '/patient/ajouter',
            icon: icons.LoginOutlined,
        },
        {
            id: 'liste',
            title: 'Liste des patients',
            type: 'item',
            url: '/patient/lister',
            icon: icons.ProfileOutlined,
        }
    ]
}

export default PatientPages;