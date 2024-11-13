import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import TitleIcon from '@mui/icons-material/Title';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewStreamIcon from '@mui/icons-material/ViewStream';
import { Box, Tab, Tabs } from '@mui/material';
import { useState, type ReactElement } from 'react';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface TabsPanelProps {
  tabs: ReactElement[];
  created?: boolean;
}

function CustomTabPanel(props: TabPanelProps): ReactElement {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const TabsPanel = ({ tabs, created }: TabsPanelProps): ReactElement => {
  const [value, setValue] = useState(0);
  const docIcons = [<ContentPasteIcon />, <CheckCircleOutlineIcon />, <TitleIcon />];
  const createdIcons = [<ViewModuleIcon />, <ViewStreamIcon />, <PersonAddIcon />];
  const docNames = ['документы', 'голосования', 'подпись'];
  const createdNames = ['типы', 'атрибуты', 'пользователи'];
  const handleChange = (event: React.SyntheticEvent, newValue: number): void => {
    setValue(newValue);
  };
  return (
    <Box width={'100%'}>
      <Tabs value={value} onChange={handleChange}>
        <Tab
          icon={created ? createdIcons[0] : docIcons[0]}
          iconPosition="start"
          label={created ? createdNames[0] : docNames[0]}
        />
        <Tab
          icon={created ? createdIcons[1] : docIcons[1]}
          iconPosition="start"
          label={created ? createdNames[1] : docNames[1]}
        ></Tab>
        <Tab
          icon={created ? createdIcons[2] : docIcons[2]}
          iconPosition="start"
          label={created ? createdNames[2] : docNames[2]}
        ></Tab>
      </Tabs>

      <CustomTabPanel value={value} index={0}>
        {tabs[0]}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        {tabs[1]}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        {tabs[2]}
      </CustomTabPanel>
    </Box>
  );
};

export default TabsPanel;
