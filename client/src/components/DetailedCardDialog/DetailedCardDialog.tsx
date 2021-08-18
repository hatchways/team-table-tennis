import React from 'react';
import { Button, Typography, Grid, Box, Dialog, Divider, DialogContent } from '@material-ui/core';
import { useState, MouseEvent } from 'react';
import useStyles from './useStyles';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import DescriptionItem from './Description/DescriptionItem';
import CommentItem from './Comments/CommentItem';
import DatePickers from './Deadline/DatePickers';
import DialogButtons from './DialogButtons/DialogButtons';
import AddColor from './AddColor/AddColor';
import AttachmentItem from './Attachment/AttachmentItem';
import { StringLiteralLike } from 'typescript';

const emails = [''];
export interface DetailedCardDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

function DetailedCardDialog(props: DetailedCardDialogProps) {
  const classes = useStyles();
  const { onClose, selectedValue, open } = props;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value: string) => {
    onClose(value);
  };

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  /* This section creates the Add To Card buttons */

  let a: any;

  /* COMMENT SECTION*/
  const createComment = () => {
    if (a == 1) {
      (document.getElementById('comment') as HTMLFormElement).style.display = 'inline';
      return (a = 0);
    } else {
      (document.getElementById('comment') as HTMLFormElement).style.display = 'none';
      return (a = 1);
    }
  };

  /* DESCRIPTION SECTION*/
  const createDescription = () => {
    if (a == 1) {
      (document.getElementById('description') as HTMLFormElement).style.display = 'inline';
      return (a = 0);
    } else {
      (document.getElementById('description') as HTMLFormElement).style.display = 'none';
      return (a = 1);
    }
  };

  /* DEADLINE SECTION*/
  const createDeadline = () => {
    if (a == 1) {
      (document.getElementById('deadline') as HTMLFormElement).style.display = 'inline';
      return (a = 0);
    } else {
      (document.getElementById('deadline') as HTMLFormElement).style.display = 'none';
      return (a = 1);
    }
  };

  /* ATTACHMENT SECTION*/
  const createAttachment = () => {
    if (a == 1) {
      (document.getElementById('attachment') as HTMLFormElement).style.display = 'inline';
      return (a = 0);
    } else {
      (document.getElementById('attachment') as HTMLFormElement).style.display = 'none';
      return (a = 1);
    }
  };

  /* End of Add to Card buttons */

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
      classes={{ paper: classes.dialogBox }}
    >
      <Grid container spacing={2} className={classes.dialogBorder}>
        <Grid item xs={12}>
          <Grid container className={classes.titleContainer}>
            <AssignmentOutlinedIcon className={classes.iconColor} />
            <Grid className={classes.mainTitle}>Card Title</Grid>
            <AddColor />
          </Grid>
          <Grid className={classes.progressBar}>In list ...</Grid>
        </Grid>
      </Grid>
      <Divider className={classes.divider} />
      <DialogContent>
        <Grid container className={classes.dialogBorder}>
          <Grid item xs={10}>
            <DescriptionItem />
            <CommentItem />
            <DatePickers />
            <AttachmentItem />
          </Grid>
          <Grid item xs={2}>
            <Grid container direction="column" className={classes.buttonItem}>
              <Grid item>
                <Box className={classes.allButtons}>
                  <Typography variant="caption" className={classes.buttonTitles}>
                    ADD TO CARD:
                  </Typography>
                  <Button className={classes.buttonStyle} onClick={createComment}>
                    Comment
                  </Button>
                  <Button className={classes.buttonStyle} onClick={createDescription}>
                    Description
                  </Button>
                  <Button className={classes.buttonStyle} onClick={createDeadline}>
                    Deadline
                  </Button>
                  <Button className={classes.buttonStyle} onClick={createAttachment}>
                    Attachment
                  </Button>
                </Box>
              </Grid>
              <Grid item>
                <Box className={classes.allButtons}>
                  <Typography variant="caption" className={classes.buttonTitles}>
                    ACTIONS:
                  </Typography>
                  <DialogButtons title="Move" />
                  <DialogButtons title="Copy" />
                  <DialogButtons title="Delete" />
                  <DialogButtons title="Share" />
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export default function SimpleDialogDemo() {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <Button className={classes.demoButton} onClick={handleClickOpen}>
        Detailed Card Dialog
      </Button>
      <DetailedCardDialog selectedValue={selectedValue} open={open} onClose={handleClose} />
    </div>
  );
}
