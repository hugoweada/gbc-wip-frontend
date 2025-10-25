import {useMemo} from 'react';
import {useNavigate} from 'react-router-dom';

interface Router {
  reload: () => void;
  push: (href: string) => void;
  replace: (href: string) => void;
}

export function useRouter(): Router {
  const navigate = useNavigate();

  return useMemo(
    () => ({
      // back: () => navigate(-1), // Uncomment if back and forward are needed
      // forward: () => navigate(1),
      reload: () => window.location.reload(),
      push: (href: string) => navigate(href),
      replace: (href: string) => navigate(href, {replace: true}),
    }),
    [navigate]
  );
}
