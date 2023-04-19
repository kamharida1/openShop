import { Box } from "../../../etc/_Theme";
import { Screen } from "../../../etc/views/screen";
import { Stack, useRouter, useSearchParams } from "expo-router";
import { Image, Text } from "@bacons/react-views";
import { ReButton } from "../../../etc/buttons/re_button";
import { useAppDispatch, useAppSelector } from "../../../src/hooks";
import { deleteBrand, selectBrandById } from "../../../src/features/brand/brandSlice";

export default function BrandDetail() {
  const router = useRouter();
  const { id } = useSearchParams();

  const dispatch = useAppDispatch();
  const brand = useAppSelector((state) => selectBrandById(state, id));

  return (
    <Screen style={{ paddingTop: 2 }}>
      <Stack.Screen options={{ title: brand?.name }} />
      <Box flex={1} m="m">
        <Image
          source={{ uri: brand?.logo }}
          style={{ width: "100%", height: "50%" }}
        />
        <Box flex={1} mt="l">
          <Text style={{ fontSize: 20 }}>{brand?.name}</Text>
          <ReButton
            variant="primary"
            label="Edit"
            onPress={() =>
              router.push({
                pathname: "/brand/add_brand",
                params: { id: brand?.id },
              })
            }
          />
          <ReButton
            style={{ marginTop: 20 }}
            variant="primary"
            label="Delete"
            onPress={() => {
              dispatch(deleteBrand(brand?.id))
              router.back();
            }}
          />
        </Box>
      </Box>
    </Screen>
  );
}