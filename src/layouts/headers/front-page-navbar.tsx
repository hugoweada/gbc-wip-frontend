import HomeIcon from '@mui/icons-material/Home';
import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';
import Stack from '@mui/joy/Stack';
import AppLogo from '../../components/app-logo';
import PrimaryButton from '../../components/buttons/primary-button';
import SecondaryButton from '../../components/buttons/secondary-button';
import PrimaryBox from '../../components/layout/primary-box';
import RowStack from '../../components/layout/row-stack';
import Word from "../../components/text/word.tsx";
import useLoginMicrosoft from "../../hooks/auth/use-login-microsoft.ts";
import useLogout from "../../hooks/auth/use-logout.ts";
import {useUserContext} from "../../hooks/contexts/user-context.ts";
import {useRouter} from "../../hooks/routes/use-router.ts";
import useAuth from '../../pages/auth/use-auth';
import {paths} from '../../routes/paths';

export default function FrontPageNavbar() {
  const router = useRouter();
  const {username} = useUserContext()
  const {isAccessTokenExist} = useAuth();
  const {onLogin} = useLoginMicrosoft()
  const {onLogout} = useLogout()

  return (
    <PrimaryBox
      sx={{
        py: 1,
        px: 2,
        display: 'flex',
        flexGrow: 1,
        justifyContent: 'space-between',
      }}
    >
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={1}
        sx={{display: {xs: 'none', sm: 'flex'}}}
      >
        <IconButton
          size="md"
          variant="outlined"
          color="neutral"
          sx={{
            display: {xs: 'none', sm: 'inline-flex'},
            borderRadius: '50%',
          }}
          onClick={() => router.push('/')}
        >
          <AppLogo size="24px"/>
        </IconButton>
        {isAccessTokenExist && (
          <PrimaryButton
            variant="plain"
            onClick={() => router.push(paths.dashboard.root)}
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            Dashboard
          </PrimaryButton>
        )}
      </Stack>
      <Box sx={{display: {xs: 'inline-flex', sm: 'none'}}}>
        <IconButton
          variant="plain"
          color="neutral"
          onClick={() => router.push(paths.dashboard.root)}
        >
          <HomeIcon/>
        </IconButton>
      </Box>

      <RowStack spacing={1} alignY="center">
        {isAccessTokenExist ? (
          <>
            <Word>{username}</Word>
            <SecondaryButton onClick={onLogout} variant="plain">
              Logout
            </SecondaryButton>
          </>
        ) : (
          <RowStack>
            <SecondaryButton onClick={onLogin} variant="plain">
              Log in
            </SecondaryButton>
          </RowStack>
        )}
      </RowStack>
    </PrimaryBox>
  );
}
