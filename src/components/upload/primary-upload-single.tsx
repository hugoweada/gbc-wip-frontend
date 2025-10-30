import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/joy/IconButton';
import React, { useRef } from 'react';
import ColumnStack from '../layout/column-stack';
import PrimaryBox from '../layout/primary-box';
import RowStack from '../layout/row-stack';
import Word from '../text/word';

interface PrimaryUploadSingleProps {
  value: File | null;
  onChangeValue: (file: File) => void;
  onClear: () => void;
}

const PrimaryUploadSingle: React.FC<PrimaryUploadSingleProps> = ({
                                                                   value,
                                                                   onChangeValue,
                                                                   onClear,
                                                                 }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const uploadedFile = e.target.files[0];
      onChangeValue(uploadedFile);

      // Reset the file input value to allow re-selection of the same file
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleClear = () => {
    // Clear the file and reset the input value
    onClear();
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Reset file input value
    }
  };

  return (
    <PrimaryBox>
      <PrimaryBox
        sx={{
          border: '2px dashed',
          borderColor: 'neutral.outlinedBorder',
          minHeight: 150,
          p: 2,
          textAlign: 'center',
          cursor: 'pointer',
        }}
        onClick={() => fileInputRef.current?.click()}
      >
        <ColumnStack sx={{ alignItems: 'center' }}>
          <input ref={fileInputRef} type="file" accept={'*'} hidden onChange={onUploadFile} />
          <CloudUploadIcon />
          <Word level="body-md" sx={{ mt: 1 }}>
            Click to upload or drag and drop
            <br />
          </Word>
        </ColumnStack>
      </PrimaryBox>
      {value != null && (
        <RowStack alignX="spread">
          <RowStack alignY="center">
            <Word color="green">{value.name}</Word>
            <img src={URL.createObjectURL(value)} style={{ width: '32px', height: '100%' }} />
          </RowStack>
          <IconButton color="danger" onClick={handleClear}>
            <DeleteIcon />
          </IconButton>
        </RowStack>
      )}
    </PrimaryBox>
  );
};

export default PrimaryUploadSingle;
