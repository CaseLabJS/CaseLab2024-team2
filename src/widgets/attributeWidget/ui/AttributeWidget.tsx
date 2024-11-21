import { CreateAttribute } from '@/features/createAttribute';
import { ROUTE_CONSTANTS } from '@/app/providers/router/config/constants';
import iconLink from '@/assets/iconLink.svg';
import { Box } from '@mui/material';
import { type ReactElement } from 'react';
import { Link } from 'react-router-dom';

import style from './attributeWidget.module.css';

const AddAttribute = (): ReactElement => {
  return (
    <Box className={style.boxCreateAttribute}>
      <Link to={`${ROUTE_CONSTANTS.ADMIN.path}${ROUTE_CONSTANTS.ATTRIBUTES.path}`} className={style.stylelinkIcon}>
        <img src={iconLink} alt="Изображение икноки перехода на следующую страницу" />
      </Link>
      <CreateAttribute />
    </Box>
  );
};

export default AddAttribute;
