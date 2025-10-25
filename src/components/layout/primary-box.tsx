import Box, {type BoxProps} from '@mui/joy/Box';
import type {ReactElement} from 'react';

function PrimaryBox(props: BoxProps): ReactElement {
  const {children, ...others} = props;
  return <Box {...others}>{children}</Box>;
}

export default PrimaryBox;
