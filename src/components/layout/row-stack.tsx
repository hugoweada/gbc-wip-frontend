import Stack from '@mui/joy/Stack';
import React, {type ReactNode} from 'react';
import type {StackAlignment} from '../../interfaces/components/alignment';

interface RowStackProps {
  alignX?: StackAlignment;
  alignY?: StackAlignment;
  children?: ReactNode;
  isSpaceBetween?: boolean;

  [key: string]: any; // Allow other props (e.g., sx, className)
}

const getAlignStyles = (alignment: StackAlignment | undefined): string => {
  switch (alignment) {
    case 'top':
    case 'left':
      return 'flex-start';
    case 'bottom':
    case 'right':
      return 'flex-end';
    case 'center':
      return 'center';
    case 'spread':
      return 'space-between';
    default:
      return 'space-between';
  }
};

const RowStack: React.FC<RowStackProps> = ({
                                             alignX,
                                             alignY,
                                             children,
                                             isSpaceBetween = false,
                                             ...others
                                           }) => (
  <Stack
    direction="row"
    spacing={2}
    sx={{
      alignItems: alignY != null ? getAlignStyles(alignY) : isSpaceBetween ? 'flex-start' : '',
      justifyContent:
        alignX != null ? getAlignStyles(alignX) : isSpaceBetween ? 'space-between' : '',
    }}
    {...others}
  >
    {children}
  </Stack>
);

export default RowStack;
