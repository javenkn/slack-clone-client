import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

export default function FileUpload({
  children,
  createMessage,
  channelId,
  noClick,
  style = {},
}) {
  const onDrop = useCallback(
    ([file]) => {
      // Do something with the files
      createMessage({
        variables: { channelId, file },
      });
    },
    [createMessage, channelId],
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    noClick,
  });
  return (
    <div {...getRootProps({ style })}>
      <input {...getInputProps()} />
      {children}
    </div>
  );
}
