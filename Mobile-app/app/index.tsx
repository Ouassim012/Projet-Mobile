import { Redirect } from 'expo-router';

export default function Index() {
  console.log('Root index is rendering');
  return <Redirect href="/Auth/welcome" />;
}
// in your page file (e.g., welcome.tsx)
Index.options = {
    headerShown: false
  };