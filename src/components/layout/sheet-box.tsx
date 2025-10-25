import type {BoxProps} from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet';
import type {SxProps} from '@mui/system';
import React, {type ReactNode} from 'react';

export interface SheetBoxProps extends BoxProps {
  onClick?: () => void;
  children?: ReactNode;
  minHeight?: string;
  p?: number;
  sx?: SxProps;
  variant?: string;
}

const style = {
  backgroundColor: 'white',
  borderRadius: '16px',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.05)',
};

const SheetBox = React.forwardRef<HTMLDivElement, SheetBoxProps>(
  ({onClick, children, minHeight, p = 2, sx = {}, variant = 'outlined', ...others}, ref) => (
    <Sheet
      ref={ref} // Forward the ref to the MUI Sheet component
      variant={variant}
      onClick={onClick}
      sx={{
        ...style,
        p,
        minHeight,
        ...sx,
      }}
      {...others}
    >
      {children}
    </Sheet>
  )
);

SheetBox.displayName = 'SheetBox';

export default SheetBox;
