import type { ReactElement } from 'react';

import { Paper, List, ListItemButton, ListItemIcon, Checkbox, ListItemText, Button } from '@mui/material';
import Grid from '@mui/material/Grid2';
import React, { useEffect } from 'react';

function not<T>(a: T[], b: T[]): T[] {
  return a.filter((value) => !b.includes(value));
}

function intersection<T>(a: T[], b: T[]): T[] {
  return a.filter((value) => b.includes(value));
}

export function TransferList<T>({
  leftData,
  rightData,
  onTransfer,
  renderListItem,
}: {
  leftData: T[];
  rightData: T[];
  onTransfer: (newLeftData: T[], newRightData: T[]) => void;
  renderListItem: (e: T) => React.ReactElement;
}): ReactElement {
  const [checked, setChecked] = React.useState<T[]>([]);
  const [left, setLeft] = React.useState<T[]>(leftData);
  const [right, setRight] = React.useState<T[]>(rightData);

  useEffect(() => {
    setLeft(leftData);
    setRight(rightData);
  }, [leftData, rightData]);

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
    const newLeft: T[] = [];
    const newRight = right.concat(left);
    setRight(newRight);
    setLeft(newLeft);
    onTransfer(newLeft, newRight);
  };

  const handleCheckedRight = (): void => {
    const newLeft = not(left, leftChecked);
    const newRight = right.concat(leftChecked);
    const newChecked = not(checked, leftChecked);

    setLeft(newLeft);
    setRight(newRight);
    setChecked(newChecked);

    onTransfer(newLeft, newRight);
  };

  const handleCheckedLeft = (): void => {
    const newLeft = left.concat(rightChecked);
    const newRight = not(right, rightChecked);
    const newChecked = not(checked, rightChecked);

    setLeft(newLeft);
    setRight(newRight);
    setChecked(newChecked);

    onTransfer(newLeft, newRight);
  };

  const handleAllLeft = (): void => {
    const newLeft = left.concat(right);
    const newRight: typeof right = [];

    setLeft(newLeft);
    setRight(newRight);

    onTransfer(newLeft, newRight);
  };

  function customList(items: T[]): ReactElement {
    return (
      <Paper sx={{ width: 300, height: 230, overflow: 'auto' }}>
        <List dense component="div" role="list">
          {items.map((value: T, index: number) => {
            return (
              <ListItemButton
                key={index}
                role="listitem"
                onClick={handleToggle(value)}
                selected={checked.includes(value)}
              >
                <ListItemIcon>
                  <Checkbox checked={checked.includes(value)} tabIndex={-1} disableRipple />
                </ListItemIcon>
                <ListItemText primary={renderListItem(value)} />
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
          >
            ≫
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
          >
            &gt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
          >
            &lt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleAllLeft}
            disabled={right.length === 0}
          >
            ≪
          </Button>
        </Grid>
      </Grid>
      <Grid>{customList(right)}</Grid>
    </Grid>
  );
}
