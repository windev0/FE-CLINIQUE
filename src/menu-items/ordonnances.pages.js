import { LoginOutlined, ProfileOutlined, MenuFoldOutlined } from '@ant-design/icons';

// icons
const icons = {
    LoginOutlined,
    ProfileOutlined,
    MenuFoldOutlined
};

const Ordonnance = {
    id: 'Ordonnance',
    title: 'Gestion des Ordonnances',
    type: 'group',
    children: [
        {
            id: 'lister',
            title: 'Ajouter une Ordonnance',
            type: 'item',
            url: '/Ordonnance/ajouter',
            icon: icons.LoginOutlined,
        },
        {
            id: 'ajouter',
            title: 'Liste des Ordonnances',
            type: 'item',
            url: '/Ordonnance/lister',
            icon: icons.MenuFoldOutlined
        },

    ]
}

export default Ordonnance;