import React from 'react';
import SheetBox, {type SheetBoxProps} from './sheet-box';

interface SoftSheetBoxProps extends SheetBoxProps {
  width?: number | string;
  others?: any;
}

const style = {
  backgroundColor: 'plain',
  borderRadius: 8,
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.10)',
};

const SoftSheetBox = React.forwardRef<HTMLDivElement, SoftSheetBoxProps>(
  ({width, children, sx, ...others}, ref) => (
    <SheetBox
      ref={ref} // Forward the ref to the SheetBox component
      variant="plain"
      sx={{
        ...style,
        width,
        ...sx,
      }}
      {...others}
    >
      {children}
    </SheetBox>
  )
);

SoftSheetBox.displayName = 'SoftSheetBox';

export default SoftSheetBox;
