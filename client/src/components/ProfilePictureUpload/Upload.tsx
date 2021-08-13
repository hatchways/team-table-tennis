import React, { useState } from 'react';
import { Grid, Button, Divider, Box } from '@material-ui/core';
import useStyles from './useStyles';
import PublishOutlinedIcon from '@material-ui/icons/PublishOutlined';

export default function Upload() {
  const classes = useStyles();
  const [fileInputState, setFileInputState] = useState('');
  const [selectedFile, setSelectedFile] = useState('');
  const [previewSource, setPreviewSource] = useState('');
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    previewFile(file);
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
        body: JSON.stringify({ data: base64EncodedImage }),
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
        <input
          type="file"
          name="image"
          onChange={handleFileInputChange}
          value={fileInputState}
          style={{ display: 'none' }}
          id="raised-button-file"
          className={classes.formInput}
        />
        <label htmlFor="raised-button-file">
          <PublishOutlinedIcon className={classes.chooseimageButton} />
        </label>
        <Grid className={classes.submitButton}>
          <Button variant="outlined" color="primary" type="submit">
            Submit
          </Button>
        </Grid>
      </form>
    </Grid>
  );
}
