import FrontPageLayout from "../../layouts/layouts/front-page-layout.tsx";
import FilePage from "../../pages/file-page.tsx";

export const fileRoutes = [
  {
    path: 'file',
    children: [
      {
        path: ':id', element: (
          <FrontPageLayout><FilePage/></FrontPageLayout>
        )
      }

    ]
  }
]
