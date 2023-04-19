import React, { useState } from "react";
import { Screen } from "../../../etc/views/screen";
import { Box } from "../../../etc/_Theme";
import { ReButton } from "../../../etc/buttons/re_button";
import TextInput from "../../../etc/forms/text_input";
import { useRouter } from "expo-router";
import { useAppDispatch } from "../../hooks";
import { createPrototype } from "./prototypeSlice";

const AddPrototypeForm = () => {
  const [name, setName] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const dispatch = useAppDispatch();
  const router = useRouter();

  const onSavePostClicked = async () => {
    if (name) {
      try {
        setAddRequestStatus("pending");
        await dispatch(createPrototype({ name })).unwrap();
      } catch (err) {
        console.error("Failed to save the category:", err);
      } finally {
        setAddRequestStatus("idle");
      }
      setName("");
      router.back();
    }
  };
  // const canSave = Boolean(name) && Boolean(description) && Boolean(image)

  return (
    <Screen>
      <Box flex={1} marginHorizontal="m" mb="xl">
        <Box mb="l">
          <TextInput
            placeholder="Enter Prototype"
            value={name}
            onChangeText={setName}
          />
        </Box>
        <ReButton
          onPress={onSavePostClicked}
          label={"Create"}
          variant="primary"
        />
      </Box>
    </Screen>
  );
};

export default AddPrototypeForm;
