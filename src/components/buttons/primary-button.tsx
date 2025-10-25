import {Button, type ButtonProps} from '@mui/joy';
import React, {type ReactElement, type ReactNode} from 'react';

export interface PrimaryButtonProps extends ButtonProps {
  children: ReactElement | string;
  startIcon?: ReactNode;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({children, ...others}) => (
  <Button color="primary" variant="solid" {...others}>
    {children}
  </Button>
);

export default PrimaryButton;
