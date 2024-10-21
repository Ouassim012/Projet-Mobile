import { Redirect } from 'expo-router';

export default function Index() {
  console.log('Root index is rendering');
  return <Redirect href="/Auth/welcome" />;
}