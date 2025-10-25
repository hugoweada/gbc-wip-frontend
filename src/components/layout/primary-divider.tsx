import Divider, {type DividerProps} from '@mui/joy/Divider';
import React from 'react';

type PrimaryDividerProps = DividerProps & {
  context?: 'none' | 'context';
  orientation?: 'horizontal' | 'vertical';
  my?: number;
};

const PrimaryDivider: React.FC<PrimaryDividerProps> = ({context, orientation, my = 1}) => (
  <Divider inset={context ?? 'none'} orientation={orientation ?? 'horizontal'} sx={{my}}/>
);

export default PrimaryDivider;
