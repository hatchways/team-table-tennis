import { useState } from 'react';
import { TextField, Grid, Button, IconButton } from '@material-ui/core';
import useStyles from './useStyles';
import ImportContactsOutlinedIcon from '@material-ui/icons/ImportContactsOutlined';
import ClearIcon from '@material-ui/icons/Clear';

export default function DescriptionItem() {
  const classes = useStyles();
  const [description, setDescription] = useState('');
  const saveDescription = () => {
    console.log(description);
  };

  return (
    <Grid id="description">
      <Grid container className={classes.titleContainer}>
        <ImportContactsOutlinedIcon className={classes.iconColor} />
        <Grid className={classes.titleFont}>Description:</Grid>
      </Grid>
      <TextField
        variant="outlined"
        placeholder={'Add a description...'}
        className={classes.textField}
        rows={6}
        fullWidth
        multiline
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Grid className={classes.savebuttonPosition}>
        <Button
          className={classes.buttonStyle}
          color="primary"
          variant="contained"
          size="large"
          onClick={() => saveDescription()}
        >
          Save
        </Button>
        <IconButton onClick={() => setDescription('')}>
          <ClearIcon color="primary" />
        </IconButton>
      </Grid>
    </Grid>
  );
}
