import { DataStore } from "aws-amplify";
import { Stack, useRouter, useSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image } from "react-native";
import { ReButton } from "../../../etc/buttons/re_button";
import { Screen } from "../../../etc/views/screen";
import { Box, Text } from "../../../etc/_Theme";
import { useCategoryAPI } from "../../../src/features/category/API";
import { Category } from "../../../src/models";
import {
  deleteCategory,
  selectCategoryById,
} from "../../../src/features/category/categorySlice";
import { useAppDispatch, useAppSelector } from "../../../src/hooks";

export default function Categore() {
  // const [category, setCategory] = useState<Category | undefined>(undefined);
  const router = useRouter();
  const { id } = useSearchParams();

  // useEffect(() => {
  //   DataStore.query(Category, categoryId).then(setCategory)
  // }, [categoryId]);

  const dispatch = useAppDispatch();
  const category = useAppSelector((state) => selectCategoryById(state, id));

  //console.log(category);

  return (
    <Screen style={{ paddingTop: 2 }}>
      <Stack.Screen options={{ title: category?.name }} />
      <Box flex={1} m="m">
        <Image
          source={{ uri: category?.image }}
          style={{ width: "100%", height: "50%" }}
        />
        <Box flex={1} mt="l">
          <Text style={{ fontSize: 20 }}>{category?.name}</Text>
          <Text
            style={{
              marginTop: 16,
              marginBottom: 30,
              fontSize: 16,
              color: "#303035",
            }}
          >
            {category?.description}
          </Text>
          <ReButton
            variant="primary"
            label="Edit"
            onPress={() =>
              router.push({
                pathname: "/category/add_category",
                params: { catId: category?.id },
              })
            }
          />
          <ReButton
            style={{ marginTop: 20 }}
            variant="primary"
            label="Delete"
            onPress={() => {
              dispatch(deleteCategory(category.id));
              router.back();
            }}
          />
        </Box>
      </Box>
    </Screen>
  );
}
