import React, { useState } from 'react';
import { Grid, Button, Box, Paper } from '@material-ui/core';
import useStyles from './useStyles';
import PublishOutlinedIcon from '@material-ui/icons/PublishOutlined';
import Dropzone, { DropzoneState } from 'react-dropzone';
import { useAuth } from '../../context/useAuthContext';

export default function Upload() {
  const classes = useStyles();
  const { loggedInUser } = useAuth();
  const [previewSource, setPreviewSource] = useState('');

  const imageMaxSize = 100000000; //byte

  const handleonDrop = (file: any) => {
    previewFile(file![0]);
  };

  const previewFile = (file: Blob) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result as string);
    };
  };

  const handleSubmitFile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!previewSource) return;
    uploadImage(previewSource);
  };

  const uploadImage = async (base64EncodedImage: string) => {
    try {
      await fetch('/api/upload', {
        method: 'POST',
        body: JSON.stringify({ data: base64EncodedImage, username: loggedInUser?.username }),
        headers: { 'Content-type': 'application/json' },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Grid>
      <Grid className={classes.imageBox}>
        {previewSource && <img src={previewSource} alt="chosen" className={classes.profileImage} />}
      </Grid>
      <Grid className={classes.uploadTitle} />
      <form onSubmit={handleSubmitFile}>
        <Grid container item>
          <Dropzone onDrop={handleonDrop} accept="image/*" multiple={false} maxSize={imageMaxSize}>
            {({ getRootProps, getInputProps }: DropzoneState) => (
              <Paper {...getRootProps()}>
                <Box>
                  <PublishOutlinedIcon className={classes.chooseimageButton} />
                  <input type="file" name="file" {...getInputProps()} />
                </Box>
              </Paper>
            )}
          </Dropzone>
        </Grid>
        <Grid className={classes.submitButton}>
          <Button variant="outlined" color="primary" type="submit">
            Submit
          </Button>
        </Grid>
      </form>
    </Grid>
  );
}
