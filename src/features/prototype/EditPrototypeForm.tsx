import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Screen } from "../../../etc/views/screen";
import { Box } from "../../../etc/_Theme";
import TextInput from "../../../etc/forms/text_input";
import { ReButton } from "../../../etc/buttons/re_button";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { selectPrototypeById, updatePrototype } from "./prototypeSlice";


export default function EditPrototypeForm() {
  const { id } = useLocalSearchParams();

  const prototype = useAppSelector((state) => selectPrototypeById(state, id));

  const [name, setName] = useState(prototype.name);
  

  const dispatch = useAppDispatch();
  const router = useRouter();

  const onSavePostClicked = () => {
    if (name) {
      dispatch(updatePrototype({ id, name})).unwrap();
      router.back();
    }
  };

  return (
    <Screen>
      <Box flex={1} marginHorizontal="m" mb="xl">
        <Box mb="l">
          <TextInput
            placeholder="Enter prototype"
            value={name}
            onChangeText={setName}
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
