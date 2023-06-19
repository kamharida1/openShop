import { Stack, useRouter } from "expo-router";

export default function OptionTypeLayout() {
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" options={{}} />
      <Stack.Screen
        name="image_view"
        options={{ }}
      />
    </Stack>
  );
}


