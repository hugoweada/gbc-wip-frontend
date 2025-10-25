import {Typography, type TypographyProps, type TypographySystem} from '@mui/joy';
import {forwardRef, type ReactNode} from 'react';

export interface WordProps extends Omit<TypographyProps, 'ref'> {
  level?: 'body-sm' | 'inherit' | keyof TypographySystem; // Make `level` required to match Typography's expectations
  fontWeight?: number;
  color?: 'primary' | 'neutral' | 'danger' | 'success' | 'warning' | string;
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify'; // Text alignment
  children?: ReactNode;
}

const Word = forwardRef<HTMLDivElement, WordProps>(
  ({level, fontWeight, color, align, children, ...others}, ref) => (
    <Typography
      ref={ref}
      level={level ?? 'inherit'}
      color={color}
      sx={{
        fontWeight: fontWeight ?? 500,
        color,
        ...(align && {textAlign: align}), // Handle alignment using `sx`
      }}
      {...others}
    >
      {children}
    </Typography>
  )
);

export default Word;
