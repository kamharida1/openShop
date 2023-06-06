import React, { useState } from "react";
import { View, Text, TextInput, Picker, Button } from "react-native";

import { createProduct } from "../api/products";

const CreateProduct = (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [producttypeID, setProducttypeID] = useState("");
  const [subcategoryID, setSubcategoryID] = useState("");
  const [prototypeID, setPrototypeID] = useState("");
  const [shippingclassID, setShippingclassID] = useState("");
  const [selectedOptionValues, setSelectedOptionValues] = useState({});
  const [optionTypes, setOptionTypes] = useState([
    {
      id: "1",
      name: "Color",
      OptionValues: [
        { id: "1", name: "Red" },
        { id: "2", name: "Green" },
        { id: "3", name: "Blue" },
      ],
      category: "PRODUCT_DETAILS_SELECT",
    },
    {
      id: "2",
      name: "Size",
      OptionValues: [
        { id: "4", name: "Small" },
        { id: "5", name: "Medium" },
        { id: "6", name: "Large" },
      ],
      category: "PRODUCT_DETAILS_SELECT",
    },
    {
      id: "3",
      name: "Material",
      OptionValues: [
        { id: "7", name: "Cotton" },
        { id: "8", name: "Polyester" },
        { id: "9", name: "Silk" },
      ],
      category: "PRODUCT_DETAILS_SELECT",
    },
    {
      id: "4",
      name: "Features",
      OptionValues: [],
      category: "PRODUCT_DETAILS_TEXT",
    },
  ]);

  const createProduct = () => {
    // TODO: Add create product logic
    console.log("Product created!");
  };

  const FormGenerator = ({ category }) => {
    switch (category) {
      case "PRODUCT_DETAILS_SELECT":
        return (
          <Picker
            selectedValue={selectedOptionValues[optionType.id] || ""}
            onValueChange={(value) =>
              setSelectedOptionValues({
                ...selectedOptionValues,
                [optionType.id]: value,
              })
            }
          >
            {optionType.OptionValues.map((optionValue) => (
              <Picker.Item
                key={optionValue.id}
                label={optionValue.name}
                value={optionValue.id}
              />
            ))}
          </Picker>
        );
      case "PRODUCT_DETAILS_TEXT":
        return (
          <TextInput
            value={selectedOptionValues[optionType.id] || ""}
            onChangeText={(text) =>
              setSelectedOptionValues({
                ...selectedOptionValues,
                [optionType.id]: text,
              })
            }
          />
        );
      default:
        return null;
    }
  };

  return (
    <View>
      <Text>Name:</Text>
      <TextInput value={name} onChangeText={(text) => setName(text)} />

      <Text>Description:</Text>
      <TextInput value={description} onChangeText={(text) => setDescription(text)} />

      <Text>Price:</Text>
      <TextInput value={price} onChangeText={(text) => setPrice(text)} />

      <Text>Product Type ID:</Text>
      <TextInput value={producttypeID} onChangeText={(text) => setProducttypeID(text)} />

      <Text>Product Subcategory ID:</Text>
      <TextInput value={
import React, { useState } from "react";
import { View, Text, TextInput, Picker, Button } from "react-native";

import { createProduct } from "../api/products";

const CreateProduct = (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [producttypeID, setProducttypeID] = useState("");
  const [subcategoryID, setSubcategoryID] = useState("");
  const [prototypeID, setPrototypeID] = useState("");
  const [shippingclassID, setShippingclassID] = useState("");
  const [selectedOptionValues, setSelectedOptionValues] = useState({});
  const [optionTypes, setOptionTypes] = useState([
    {
      id: "1",
      name: "Color",
      OptionValues: [
        { id: "1", name: "Red" },
        { id: "2", name: "Green" },
        { id: "3", name: "Blue" },
      ],
      category: "PRODUCT_DETAILS_SELECT",
    },
    {
      id: "2",
      name: "Size",
      OptionValues: [
        { id: "4", name: "Small" },
        { id: "5", name: "Medium" },
        { id: "6", name: "Large" },
      ],
      category: "PRODUCT_DETAILS_SELECT",
    },
    {
      id: "3",
      name: "Material",
      OptionValues: [
        { id: "7", name: "Cotton" },
        { id: "8", name: "Polyester" },
        { id: "9", name: "Silk" },
      ],
      category: "PRODUCT_DETAILS_SELECT",
    },
    {
      id: "4",
      name: "Features",
      OptionValues: [],
      category: "PRODUCT_DETAILS_TEXT",
    },
  ]);

  const createProduct = () => {
    // TODO: Add create product logic
    console.log("Product created!");
  };

  const FormGenerator = ({ category }) => {
    switch (category) {
      case "PRODUCT_DETAILS_SELECT":
        return (
          <Picker
            selectedValue={selectedOptionValues[optionType.id] || ""}
            onValueChange={(value) =>
              setSelectedOptionValues({
                ...selectedOptionValues,
                [optionType.id]: value,
              })
            }
          >
            {optionType.OptionValues.map((optionValue) => (
              <Picker.Item
                key={optionValue.id}
                label={optionValue.name}
                value={optionValue.id}
              />
            ))}
          </Picker>
        );
      case "PRODUCT_DETAILS_TEXT":
        return (
          <TextInput
            value={selectedOptionValues[optionType.id] || ""}
            onChangeText={(text) =>
              setSelectedOptionValues({
                ...selectedOptionValues,
                [optionType.id]: text,
              })
            }
          />
        );
      default:
        return null;
    }
  };

  return (
    <View>
      <Text>Name:</Text>
      <TextInput value={name} onChangeText={(text) => setName(text)} />

      <Text>Description:</Text>
      <TextInput value={description} onChangeText={(text) => setDescription(text)} />

      <Text>Price:</Text>
      <TextInput value={price} onChangeText={(text) => setPrice(text)} />

      <Text>Product Type ID:</Text>
      <TextInput value={producttypeID} onChangeText={(text) => setProducttypeID(text)} />

      <Text>Product Subcategory ID:</Text>
      <TextInput value={subcategoryID} onChangeText={(text) => setSubcategoryID(text)} />
 <Text>Product Prototype ID:</Text>
  <TextInput value={prototypeID} onChangeText={(text) => setPrototypeID(text)} />

  <Text>Product Shipping Class ID:</Text>
  <TextInput value={shippingclassID} onChangeText={(text) => setShippingclassID(text)} />

  {optionTypes.map((optionType) => (
    <View key={optionType.id}>
      <Text>{optionType.name}:</Text>
      <FormGenerator category={optionType.category} />
    </View>
  ))}

  <Button title="Create Product" onPress={createProduct} />
</View>