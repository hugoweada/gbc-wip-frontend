import {useRoutes} from 'react-router-dom';
import {authRoutes} from "./auth.tsx";
import {fileRoutes} from "./file.tsx";

export default function Router() {
  return useRoutes([
    ...authRoutes,
    ...fileRoutes,
    {path: '*', element: <div>404</div>},
  ]);
}
