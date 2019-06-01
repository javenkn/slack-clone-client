import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

export default function FileUpload({ children, noClick }) {
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    noClick,
  });
  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {children}
    </div>
  );
}
