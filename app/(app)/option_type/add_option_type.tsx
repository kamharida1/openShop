import { useRouter, useSearchParams } from "expo-router";
import { useDataStore } from "../../../src/hooks/useDataStoreUpdate";
import { PurposeEnum, OptionType} from "../../../src/models";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { Screen } from "../../../etc/views/screen";
import { Box } from "../../../etc/_Theme";
import TextInput from "../../../etc/forms/text_input";
import { Picker } from "@react-native-picker/picker";
import { Image } from "@bacons/react-views";
import { Button } from "../../../etc/buttons/button";
import { DataStore } from "aws-amplify";

import DropdownComponent from "../../../etc/forms/dropdown";

import { StyleSheet } from "react-native";
import { object } from "yup";

const PlaceholderImageSource = "https://picsum.photos/200/300";

const options = [
  { label: "Java", value: "java" },
  { label: "JavaScript", value: "js" },
  { label: "Python", value: "python" },
  { label: "Swift", value: "swift" },
];


export default function AddOptionType() {
  // const [selectedValue, setSelectedValue] = useState("java");
  const [isFocus, setIsFocus] = useState(false);
  const [isFocusOpt, setIsFocusOpt] = useState(false);
  const { id, mode } = useSearchParams();
  
  const [name, setName] = useState('');
  const [placeholder, setPlaceholder] = useState('')
  const [value, setValue] = useState("")
  const [optionType, setOptionType] = useState()
  const [selectedPurpose, setSelectedPurpose] = useState(PurposeEnum.FEATURE)
  const [purposeEnums, setPurposeEnums] = useState([])
  
  useEffect(() => {
    const purposeEnums = Object.values(PurposeEnum)
    const options = purposeEnums.map((option) => ({
      label: option,
      value: option,
    }));
    setPurposeEnums(options);
  },[])

  const { data: optionTypes, create } = useDataStore(OptionType);

  // console.warn(purposeEnums);

  const router = useRouter();

  useEffect(() => {
    const optionType = optionTypes.find((opt) => opt.id === id);
    setOptionType(optionType);

    if (mode !== undefined) {
      setName(optionType?.name);
      setPlaceholder(optionType?.placeholder)
    }
  }, [optionTypes, optionType]);

  const handleUpdateRecord = async (optionType) => {
    const original = await DataStore.query(OptionType, optionType.id);
    const updated = OptionType.copyOf(original, (updated) => {
      updated.name = name;
      updated.placeholder = placeholder;
      updated.category = selectedPurpose;
      updated.value = value;
    });
    await DataStore.save(updated);
  };

  const handleSaveRecord = (opt) => create(opt);

  const saveRecord = async () => {
    const opt = {
      name,
      placeholder,
      value,
      category: selectedPurpose,
    };
    mode !== undefined
      ? handleUpdateRecord(optionType)
      : handleSaveRecord(opt);
    setName("");
    setPlaceholder("");
    setValue("");
    setSelectedPurpose(PurposeEnum.FEATURE)
    // setImage("");
    // setProductTypeID(null as any)
    router.back();
  };

  // const canSave = Boolean(name) && Boolean(description) && Boolean(productTypeID) && Boolean(image);

  return (
    <Screen>
      <Box flex={1} marginHorizontal="m" mb="xl">
        <Box mb="s">
          <TextInput
            placeholder="Enter name"
            value={name}
            onChangeText={setName}
          />
        </Box>
        <Box mb="s">
          <TextInput
            placeholder="Enter placeholder"
            value={placeholder}
            onChangeText={setPlaceholder}
          />
        </Box>
        <Box mb="s">
          <DropdownComponent
            value={selectedPurpose}
            isFocus={isFocusOpt}
            setIsFocus={setIsFocusOpt}
            setValue={setSelectedPurpose}
            data={purposeEnums}
          />
        </Box>
        <Button
          onPress={saveRecord}
          buttonStyle={{
            width: "100%",
            height: 50,
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 8,
            backgroundColor: "#CCC",
            borderRadius: 10,
          }}
          textStyle={{
            color: "#000",
            fontSize: 16,
            fontWeight: "600",
          }}
        >
          {mode === "update" ? "Update" : "Create"}
        </Button>
      </Box>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    overflow: "hidden",
    marginVertical: 10,
  },
  picker: {
    height: 50,
    width: "100%",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
  },
  item: {
    fontSize: 20,
    color: "#000",
    fontFamily: "Roboto",
  },
});
