import { Box, Card, Text } from "../../../etc/_Theme";
import { memo, useEffect, useMemo, useState } from "react";
import { Link, useRouter, useSearchParams } from "expo-router";
import { Image, Pressable } from "@bacons/react-views";
import { RoundIconButton } from "../../../etc/icons";
// import brands from '../../../data/brands'
import { FlatList } from "react-native-gesture-handler";
import { useAppDispatch, useAppSelector } from "../../../src/hooks";
import { fetchBrands, selectAllBrands } from "../../../src/features/brand/brandSlice";
import { Brand } from "../../../src/models";
import { DataStore } from "aws-amplify";

interface brandT {
  obj: {
    id: string
    name: string
    logo: string
  }
  onPress: () => void
}

const BrandCard = memo(({ obj, onPress }: brandT) => {
  const { id, name, logo } = obj;
  const router = useRouter();
  return (
    <Link href={`/brand/${id}`} asChild>
      <Pressable>
        <Card
          overflow="hidden"
          flexDirection="row"
          padding="l"
          margin="s"
          variant="elevated"
        >
          <Image
            source={{ uri: logo }}
            style={{ width: 80, height: 80, resizeMode: "cover" }}
          />
          <Box ml="m" flex={1}>
            <Text variant="body">{name}</Text>
          </Box>
          <Box alignItems="center" justifyContent="center">
            <RoundIconButton
              name="chevron-right"
              size={30}
              color="forgroundSubdued"
              iconRatio={1}
              align="center"
              onPress={() => router.push("/[id]")}
            />
          </Box>
        </Card>
      </Pressable>
    </Link>
  );
});

export default function Brands() {
  const brands = useQueriedBrands();
  const brandStatus = useAppSelector((state) => state.brands.status);

  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (brandStatus === "idle") {
      dispatch(fetchBrands());
    }
  }, [brandStatus, dispatch]);

  function useQueriedBrands() {
    const brands = useAppSelector(selectAllBrands);
    // const [brands, setBrands] = useState<Brand[]>([])

    // const loadBrands = () => {
    //   DataStore.query(Brand).then(setBrands);
    // };

    // useEffect(() => {
    //   loadBrands();
    //   const subscription = DataStore.observe(Brand).subscribe(() =>
    //     loadBrands()
    //   );
    //   return () => subscription.unsubscribe();
    // }, []);

    const { q } = useSearchParams<{ q: string }>();

    return useMemo(
      () =>
        brands.filter((item) => {
          if (!q) {
            return true;
          }
          return item.name.toLowerCase().includes(q?.toLowerCase());
        }),
      [q, brands]
    );
  }

  const _renderItem = ({ item }) => {
    return (
      <>
        <BrandCard
          obj={item}
          onPress={() =>
            router.push({
              pathname: "/brand/[id]",
              params: { id: item.id },
            })
          }
        />
      </>
    );
  };
  
 const _keyExtractor = (item) => item.id.toString();

 return (
   <FlatList
     contentInsetAdjustmentBehavior="automatic"
     scrollEventThrottle={16}
     data={brands}
     renderItem={_renderItem}
     keyExtractor={_keyExtractor}
     onEndReachedThreshold={0.5}
     //stickyHeaderIndices={[0]}
     stickyHeaderHiddenOnScroll
     contentContainerStyle={{ marginTop: 14 }}
   />
 );
}
