import { useLocalSearchParams, useRouter, useSearchParams } from "expo-router";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";

import { Screen } from "../../../etc/views/screen";
import { Box } from "../../../etc/_Theme";
import TextInput from "../../../etc/forms/text_input";
import { ReButton } from "../../../etc/buttons/re_button";
import { Image } from "@bacons/react-views";
import { useDispatch, useSelector } from "react-redux";
import { selectCategoryById, updateCategory } from "./categorySlice";
import { useAppDispatch, useAppSelector } from "../../hooks";


type EditCategoryFormT = {
  cat: {
    name: string;
    description: string;
    image: string;
  };
};

const PlaceholderImageSource = "https://picsum.photos/200/300";

export default function EditCategoryForm({ cat }: EditCategoryFormT) {
  const {catId}  = useLocalSearchParams();

  const category = useAppSelector((state) => selectCategoryById(state, catId))

  const [name, setName] = useState(category.name);
  const [description, setDescription] = useState(category.description);
  const [image, setImage] = useState(category.image);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const onSavePostClicked = () => {
    if (name && description && image) {
      dispatch(updateCategory({ id: catId, name, description, image })).unwrap();
      router.back();
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    } else {
      alert("You did not select any image.");
    }
  };

  return (
    <Screen>
      <Box flex={1} marginHorizontal="m" mb="xl">
        <Box mb="l">
          <TextInput
            placeholder="Enter category"
            value={name}
            onChangeText={setName}
          />
        </Box>
        <Box mb="l">
          <TextInput
            placeholder="Enter description"
            value={description}
            onChangeText={setDescription}
          />
        </Box>
        <Box mb="l" justifyContent="space-around">
          <ReButton onPress={pickImage} label={"Pick an Image"} />
          <Image
            source={{ uri: image ?? PlaceholderImageSource }}
            style={{
              alignSelf: "center",
              width: 80,
              height: 80,
              marginBottom: 16,
            }}
          />
        </Box>
        <ReButton
          style={{ marginBottom: 16 }}
          onPress={onSavePostClicked}
          label={"Update"}
          variant="primary"
        />
      </Box>
    </Screen>
  );
}
