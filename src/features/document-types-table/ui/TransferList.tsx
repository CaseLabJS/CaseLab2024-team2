import type { ReactElement } from 'react';

import { Paper, List, ListItemButton, ListItemIcon, Checkbox, ListItemText, Button } from '@mui/material';
import Grid from '@mui/material/Grid2';
import React from 'react';

function not<T>(a: T[], b: T[]): T[] {
  return a.filter((value) => !b.includes(value));
}

function intersection<T>(a: T[], b: T[]): T[] {
  return a.filter((value) => b.includes(value));
}

function TransferList<T>({ leftData, rightData }: { leftData: T[]; rightData: T[] }): ReactElement {
  const [checked, setChecked] = React.useState<T[]>([]);
  const [left, setLeft] = React.useState<T[]>(leftData);
  const [right, setRight] = React.useState<T[]>(rightData);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value: T) => (): void => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleAllRight = (): void => {
    setRight(right.concat(left));
    setLeft([]);
  };

  const handleCheckedRight = (): void => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = (): void => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = (): void => {
    setLeft(left.concat(right));
    setRight([]);
  };

  function customList(items: T[]): ReactElement {
    return (
      <Paper sx={{ width: 200, height: 230, overflow: 'auto' }}>
        <List dense component="div" role="list">
          {items.map((value: T) => {
            return (
              <ListItemButton key={String(value)} role="listitem" onClick={handleToggle(value)}>
                <ListItemIcon>
                  <Checkbox checked={checked.includes(value)} tabIndex={-1} disableRipple />
                </ListItemIcon>
                <ListItemText primary={String(value)} />
              </ListItemButton>
            );
          })}
        </List>
      </Paper>
    );
  }

  return (
    <Grid container spacing={2} sx={{ justifyContent: 'center', alignItems: 'center' }}>
      <Grid>{customList(left)}</Grid>
      <Grid>
        <Grid container direction="column" sx={{ alignItems: 'center' }}>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleAllRight}
            disabled={left.length === 0}
            aria-label="move all right"
          >
            ≫
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleAllLeft}
            disabled={right.length === 0}
            aria-label="move all left"
          >
            ≪
          </Button>
        </Grid>
      </Grid>
      <Grid>{customList(right)}</Grid>
    </Grid>
  );
}

export default TransferList;
