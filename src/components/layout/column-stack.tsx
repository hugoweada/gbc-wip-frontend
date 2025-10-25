import Stack, {type StackProps} from '@mui/joy/Stack';
import React, {type ReactNode} from 'react';
import type {StackAlignment} from '../../interfaces/components/alignment';

interface ColumnStackProps extends StackProps {
  alignX?: StackAlignment;
  alignY?: StackAlignment;
  children: ReactNode;
  noSpacing?: boolean;
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
    default:
      return 'space-between';
  }
};

const ColumnStack: React.FC<ColumnStackProps> = ({
                                                   alignX,
                                                   alignY,
                                                   children,
                                                   noSpacing = false,
                                                   ...others
                                                 }) => {
  const style = {
    alignItems: alignY != null ? getAlignStyles(alignY) : '',
    justifyContent: alignX != null ? getAlignStyles(alignX) : '',
  };

  return (
    <Stack direction="column" spacing={noSpacing ? 0 : 2} sx={style} {...others}>
      {children}
    </Stack>
  );
};

export default ColumnStack;
