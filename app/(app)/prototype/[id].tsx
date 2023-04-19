import { Box } from "../../../etc/_Theme";
import { Screen } from "../../../etc/views/screen";
import { Stack, useRouter, useSearchParams } from "expo-router";
import { Image, Text } from "@bacons/react-views";
import { ReButton } from "../../../etc/buttons/re_button";
import { useAppDispatch, useAppSelector } from "../../../src/hooks";
import {
  deleteBrand,
  selectBrandById,
} from "../../../src/features/brand/brandSlice";

export default function PrototypeDetail() {
  // const [brand, setBrand] = useState<Brand | undefined>(undefined);
  const router = useRouter();
  const { id } = useSearchParams();

  // useEffect(() => {
  //   DataStore.query(Brand, id).then(setBrand);
  // }, [id]);
  const dispatch = useAppDispatch();
  const prototype = useAppSelector((state) => selectPrototypeById(state, id));

  // const brand = brands.find((brand) => brand.id === id);

  return (
    <Screen style={{ paddingTop: 2 }}>
      <Stack.Screen options={{ title: prototype?.name }} />
      <Box flex={1} m="m">
        <Image
          source={{ uri: prototype?.logo }}
          style={{ width: "100%", height: "50%" }}
        />
        <Box flex={1} mt="l">
          <Text style={{ fontSize: 20 }}>{prototype?.name}</Text>
          <ReButton
            variant="primary"
            label="Edit"
            onPress={() =>
              router.push({
                pathname: "/prototype/add_prototype",
                params: { id: prototype?.id },
              })
            }
          />
          <ReButton
            style={{ marginTop: 20 }}
            variant="primary"
            label="Delete"
            onPress={() => {
              dispatch(deleteBrand(prototype?.id));
              router.back();
            }}
          />
        </Box>
      </Box>
    </Screen>
  );
}
