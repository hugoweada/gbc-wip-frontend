import {testApi} from "../api/app/test.ts";
import PrimaryButton from "../components/buttons/primary-button.tsx";
import PrimaryBox from "../components/layout/primary-box.tsx";
import Word from "../components/text/word.tsx";
import useRequest from "../hooks/api/use-request.ts";
import useString from "../hooks/primitive/use-string.ts";

const FrontPage = () => {
  const {onRequest} = useRequest();
  const testResult = useString('')
  const onTest = async () => {
  const response =  await onRequest(testApi.test, [], null, true)
    testResult.onChangeValue(JSON.stringify(response.result))
  }
  return (
    <PrimaryBox sx={{height: '100vh'}}>
      <PrimaryButton onClick={onTest}>Test</PrimaryButton>
      <Word>{testResult.value}</Word>
    </PrimaryBox>
  )
}

export default FrontPage
