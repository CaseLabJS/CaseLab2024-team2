import type { ReactElement } from 'react';

import { ROUTE_CONSTANTS } from '@/app/providers/router/config/constants';
import { CreateAttribute } from '@/features/createAttribute';
import { WidgetToPageButton } from '@/shared/components';
import { Box } from '@mui/material';

import style from './attributeWidget.module.css';

const AddAttribute = (): ReactElement => {
  return (
    <Box className={style.boxCreateAttribute}>
      <WidgetToPageButton path={`${ROUTE_CONSTANTS.ADMIN.path}${ROUTE_CONSTANTS.ATTRIBUTES.path}`} />
      <CreateAttribute />
    </Box>
  );
};

export default AddAttribute;
