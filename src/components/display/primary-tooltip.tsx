import Tooltip, {type TooltipProps} from '@mui/joy/Tooltip';
import {forwardRef, type ReactElement} from 'react';

interface PrimaryTooltipProps extends TooltipProps {
  title: string | ReactElement;
  children: ReactElement;
}

const PrimaryTooltip = forwardRef<HTMLDivElement, PrimaryTooltipProps>(
  ({title, children, ...others}, ref) => (
    <Tooltip title={title} ref={ref} {...others}>
      {children}
    </Tooltip>
  )
);

export default PrimaryTooltip;
