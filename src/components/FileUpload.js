import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

export default function FileUpload({
  children,
  createMessage,
  channelId,
  noClick,
}) {
  const onDrop = useCallback(
    ([file]) => {
      // Do something with the files
      createMessage({
        variables: { channelId, file },
      });
    },
    [createMessage],
  );
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
