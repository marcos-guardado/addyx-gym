import { Button } from "rsuite";
import { signInWithGoogle } from "../../services/firebase";

export default function Login() {
  return (
    <>
      <Button appearance="primary" onClick={signInWithGoogle}>
        Login with Google
      </Button>
    </>
  );
}
