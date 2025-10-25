import Word from "../../components/text/word.tsx";
import FrontPageLayout from "../../layouts/layouts/front-page-layout.tsx";
import FrontPage from "../../pages/front-page.tsx";

export const authRoutes = [
  {
    path: '/',
    element: (
      <FrontPageLayout><FrontPage/></FrontPageLayout>
    ),
  }, {
    path: 'login',
    element: (
      <FrontPageLayout><Word>123</Word></FrontPageLayout>
    ),
  }
]
