import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function ImportButton() {
  return (
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
      sx={{
        bgcolor: "transparent",
        borderRadius: "8px",
        border: "1px solid",
        borderColor: 'grey.300',
        color: 'black',
        textTransform: 'none', // untuk memastikan teks tetap dalam format camelCase
        fontSize: '12px',
        '&:hover': {
          bgcolor: 'grey.100', // warna abu-abu ketika di-hover
          boxShadow: 'none'
        },
        boxShadow: "none"
      }}
    >
      Upload Data
      <VisuallyHiddenInput type="file" accept=".xlsx" />
    </Button>
  );
}
