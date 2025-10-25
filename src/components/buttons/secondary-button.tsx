import {Button, type ButtonProps} from '@mui/joy';
import React from 'react';

export interface SecondaryButtonProps extends ButtonProps {
  startDecorator?: React.ReactNode;
}

const SecondaryButton: React.FC<SecondaryButtonProps> = ({
                                                           startDecorator,
                                                           variant = 'outlined',
                                                           size = 'md',
                                                           children,
                                                           ...others
                                                         }) => (
  <Button variant={variant} size={size} startDecorator={startDecorator} {...others}>
    {children}
  </Button>
);

export default SecondaryButton;
