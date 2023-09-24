import { LoginOutlined, ProfileOutlined, MenuFoldOutlined } from '@ant-design/icons';

// icons
const icons = {
    LoginOutlined,
    ProfileOutlined,
    MenuFoldOutlined
};

const Consultation = {
    id: 'consultation',
    title: 'Gestion des consultations',
    type: 'group',
    children: [
        {
            id: 'ajouter3',
            title: 'Ajouter une consultation',
            type: 'item',
            url: '/consultation/ajouter',
            icon: icons.LoginOutlined,
        },
        {
            id: 'lister3',
            title: 'Liste des Consultations',
            type: 'item',
            url: '/consultation/lister',
            icon: icons.MenuFoldOutlined
        },

    ]
}

export default Consultation;