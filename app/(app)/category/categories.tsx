import { fetchCategories, selectAllCategories } from "../../../src/features/category/categorySlice";
import CategoryCard from "../../../etc/cards/category_card";
import { useRouter, useSearchParams } from "expo-router";
import { FlatList } from "react-native";
import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../../src/hooks";

export default function Categories() {
  const categories = useQueriedCategories();
  const catStatus = useAppSelector((state) => state.categories.status);

  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (catStatus === "idle") {
      dispatch(fetchCategories());
    }
  }, [catStatus, dispatch]);

  function useQueriedCategories() {
    const categories = useAppSelector(selectAllCategories);

    const { q } = useSearchParams<{ q: string }>();

    return useMemo(
      () =>
        categories.filter((item) => {
          if (!q) {
            return true;
          }
          return item.name.toLowerCase().includes(q?.toLowerCase());
        }),
      [q, categories]
    );
  }

  const _renderItem = ({ item }) => {
    return (
      <>
        <CategoryCard
          obj={item}
          onPress={() =>
            router.push({
              pathname: "/category/[id]",
              params: { id: item.id },
            })
          }
        />
      </>
    );
  };

  const _keyExtractor = (obj) => obj.id.toString();

  return (
    <FlatList
      contentInsetAdjustmentBehavior="automatic"
      scrollEventThrottle={16}
      data={categories}
      renderItem={_renderItem}
      keyExtractor={_keyExtractor}
      onEndReachedThreshold={0.5}
      stickyHeaderIndices={[0]}
      stickyHeaderHiddenOnScroll
      contentContainerStyle={{ marginTop: 14 }}
    />
  );
}
