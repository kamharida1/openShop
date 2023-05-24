import { useRouter, useSearchParams } from "expo-router";
import { useDataStore } from "../../../src/hooks/useDataStoreUpdate";
import {  OptionType, OptionValue } from "../../../src/models";
import { useEffect, useState } from "react";
import { Screen } from "../../../etc/views/screen";
import { Box } from "../../../etc/_Theme";
import TextInput from "../../../etc/forms/text_input";

import { Button } from "../../../etc/buttons/button";
import { DataStore } from "aws-amplify";

import DropdownComponent from "../../../etc/forms/dropdown";

import { StyleSheet } from "react-native";
import { SubCategory } from "../../../src/models";


export default function AddOptionValue() {
  const [isFocus, setIsFocus] = useState(false);

  const { id, mode } = useSearchParams();

  const [name, setName] = useState("");
  const [optionTypeID, setOptionTypeID] = useState("");
  const [optionValue, setOptionValue] = useState(undefined);
  const [optionTypes, setOptionTypes] = useState<OptionType[]>([]);

  const { data } = useDataStore(OptionType);

  useEffect(() => {
    const options = data.map((option) => ({
      label: option.name,
      value: option.id,
    }));
    setOptionTypes(options);
  }, [data, setOptionTypes]);

  const { data: optionValues, create } = useDataStore(OptionValue);

  // console.warn(optionTypes);

  const router = useRouter();

  useEffect(() => {
    const optionValue = optionValues.find((opt) => opt.id === id);
    setOptionValue(optionValue);

    if (mode !== undefined) {
      setName(optionValue?.name);
      setOptionTypeID("");
    }
  }, [optionValues, optionValue]);

  const handleUpdateRecord = async (optionValue) => {
    const original = await DataStore.query(OptionValue, optionValue.id);
    const updated = OptionValue.copyOf(original, (updated) => {
      updated.name = name;
      updated.optiontypeID = optionTypeID;
    });
    await DataStore.save(updated);
  };

  const handleSaveRecord = (opt) => create(opt);

  const saveRecord = async () => {
    const subCat = {
      name,
      optionTypeID
    };
    mode !== undefined
      ? handleUpdateRecord(optionValue)
      : handleSaveRecord(subCat);
    setName("");
    setOptionTypeID("");
    router.back();
  };

  const canSave = Boolean(name) && Boolean(optionTypeID);

  return (
    <Screen>
      <Box flex={1} marginHorizontal="m" mb="xl">
        <Box mb="l">
          <TextInput
            placeholder="Enter option value"
            value={name}
            onChangeText={setName}
          />
        </Box>
        <Box mb="l">
          <DropdownComponent
            value={optionTypeID}
            isFocus={isFocus}
            setIsFocus={setIsFocus}
            setValue={setOptionTypeID}
            data={optionTypes}
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
