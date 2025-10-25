import {useRoutes} from 'react-router-dom';
import {authRoutes} from "./auth.tsx";

export default function Router() {
  return useRoutes([
    ...authRoutes,
    {path: '*', element: <div>404</div>},
  ]);
}
