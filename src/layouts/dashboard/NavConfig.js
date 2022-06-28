// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'claim',
    path: '/dashboard/claims',
    icon: getIcon('eva:file-text-fill'),
  },
  {
    title: 'key',
    path: '/dashboard/keys',
    icon: getIcon('eva:lock-fill'),
  },
];

export default navConfig;
