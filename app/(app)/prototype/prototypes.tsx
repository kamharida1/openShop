import { Screen } from "../../../etc/views/screen";
import { Box, Card, Text } from "../../../etc/_Theme";
import { memo, useEffect, useMemo } from "react";
import { Link, useRouter, useSearchParams } from "expo-router";
import { Image, Pressable } from "@bacons/react-views";
import { RoundIconButton } from "../../../etc/icons";
import { FlatList } from "react-native-gesture-handler";
import { useAppDispatch, useAppSelector } from "../../../src/hooks";
import { fetchPrototypes, selectAllPrototypes } from "../../../src/features/prototype/prototypeSlice";

interface PrototypeT {
  obj: {
    id: string;
    name: string;
  };
  onPress: () => void;
}

const PrototypeCard = memo(({ obj, onPress }: PrototypeT) => {
  const { id, name} = obj;
  const router = useRouter();
  return (
    <Link href={`/prototype/${id}`} asChild>
      <Pressable>
        <Card
          overflow="hidden"
          flexDirection="row"
          padding="l"
          margin="s"
          variant="elevated"
        >
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

export default function Prototypes() {
  const prototypes = useQueriedPrototypes();
  const prototypeStatus = useAppSelector((state) => state.prototypes.status);

  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (prototypeStatus === "idle") {
      dispatch(fetchPrototypes());
    }
  }, [prototypeStatus, dispatch]);

  function useQueriedPrototypes() {
    const prototypes = useAppSelector(selectAllPrototypes);

    const { q } = useSearchParams<{ q: string }>();

    return useMemo(
      () =>
        prototypes.filter((item) => {
          if (!q) {
            return true;
          }
          return item.name.toLowerCase().includes(q?.toLowerCase());
        }),
      [q, prototypes]
    );
  }

  const _renderItem = ({ item }) => {
    return (
      <>
        <PrototypeCard
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
      data={prototypes}
      renderItem={_renderItem}
      keyExtractor={_keyExtractor}
      onEndReachedThreshold={0.5}
      //stickyHeaderIndices={[0]}
      stickyHeaderHiddenOnScroll
      contentContainerStyle={{ marginTop: 14 }}
    />
  );
}
