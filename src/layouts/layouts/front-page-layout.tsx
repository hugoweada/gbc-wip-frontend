import type {ReactElement} from 'react';
import PrimaryBox from '../../components/layout/primary-box';
import PrimaryDivider from '../../components/layout/primary-divider';
import COLORS from '../../constants/theme/colors';
import FrontPageNavbar from '../headers/front-page-navbar';

export default function FrontPageLayout(
  {
    my = '80px',
    children,
  }: {
    my?: string;
    children: ReactElement;
  }) {
  return (
    <PrimaryBox sx={{backgroundColor: COLORS['frontPageBackgroundColor']}}>
      <FrontPageNavbar/>
      <PrimaryDivider my={0}/>
      <PrimaryBox sx={{my}}>{children}</PrimaryBox>
    </PrimaryBox>
  );
}
