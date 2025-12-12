import { ReduxProvider } from "./components/ReduxProvider";
import Login from "./components/auth/Login";

export default function Page() {
  return (
    <ReduxProvider>
      <Login />
    </ReduxProvider>
  );
}
