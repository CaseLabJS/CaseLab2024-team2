import { Layout } from '@/shared/components/layout';
import { Breadcrumbs } from '@/widgets/breadcrumbs';
import { Typography } from '@mui/material';
import { useEffect, useState, type ReactElement } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

const Admin = (): ReactElement => {
  const [title, setTitle] = useState('ADMIN MENU');
  const pathName = useLocation().pathname;

  useEffect(() => {
    if (pathName === '/admin') {
      setTitle('ADMIN MENU');
    } else {
      setTitle('СОЗДАНИЕ');
    }
  }, [pathName]);

  return (
    <Layout>
      <Breadcrumbs />
      <Typography variant="h4">{title}</Typography>
      <Outlet />
    </Layout>
  );
};

export default Admin;
