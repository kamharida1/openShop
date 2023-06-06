import { FC, useEffect, useState } from "react";
import { Brand, Category, LazyProduct, OptionType, OptionValue, Product, ProductType, SubCategory } from "../../src/models";
import { Text, View } from "@bacons/react-views";
import { Box } from "../_Theme";
import DropdownComponent from "./dropdown";
import { DataStore } from "aws-amplify";
import { Picker } from "@react-native-picker/picker";
import { Button } from "react-native";
import TextInput from "./text_input";
import { ScrollView } from "react-native-gesture-handler";

interface MyObject {
  [key: string]: any;
}

interface ProductFormT {
  optionTypes: OptionType[];
  showOptType: boolean;
  handleDetailsChange: (name: string, value: string) => void;
  handleSubCategoryChange: (subCatID: string) => void;
  handleChange: (key: string, value: string) => void;
  values: any;
  setValues: any;
  setOptionTypes: any;
  details: any;
  saveRecord: (values: LazyProduct) => void;
  brands: Brand[];
  categories: Category[];
  subCategories: SubCategory[];
  productTypes: ProductType[];
}

const ProductForm2: FC<ProductFormT> = ({
  optionTypes,
  values,
  setValues,
  brands,
  details,
  categories,
  subCategories,
  productTypes,
  showOptType,
  handleSubCategoryChange,
  handleDetailsChange
}) => {
  const [isFocus, setIsFocus] = useState(false);
  const [brandList, setBrandList] = useState([]);
  const [catList, setCatList] = useState([]);
  const [subList, setSubsList] = useState([]);
  const [subcategoryID, setSubCategoryID] = useState("");
  const [productTypesList, setProductTypeList] = useState([]);
  const [productTypeID, setProductTypeID] = useState(null);
  const [name, setName] = useState("");
  const [count, setCount] = useState(0);
  const [about, setAbout] = useState("");
  const [images, setImages] = useState([]);
  const [rating, setRating] = useState(0.0);
  const [price, setPrice] = useState(0.0);
  const [categoryID, setCategoryID] = useState("");
  const [brandID, setBrandID] = useState("");
  const [producttypeID, setProducttypeID] = useState("");
  const [prototypeID, setPrototypeID] = useState("");
  const [shippingclassID, setShippingclassID] = useState("");
  const [selectedOptionValue, setSelectedOptionValue] = useState('');
  const [optionValues, setOptionValues] = useState([])
  // const [details, setDetails] = useState({});
  // const [optionValues, setOptionValues] = useState([]);

  useEffect(() => {
    //console.warn(catList);
    const brandOptions = brands.map((option) => ({
      label: option.name,
      value: option.id,
    }));
    setBrandList(brandOptions);

    const catOptions = categories.map((option) => ({
      label: option.name,
      value: option.id,
    }));
    setCatList(catOptions);

    const subsOptions = subCategories.map((option) => ({
      label: option.name,
      value: option.id,
    }));
    setSubsList(subsOptions);

    const productTypeOptions = productTypes.map((option) => ({
      label: option.name,
      value: option.id,
    }));
    setProductTypeList(productTypeOptions);
  }, [brands, categories, subCategories, productTypes]);

  // const createProduct = async () => {
  //   const product = await DataStore.save(
  //     new Product({
  //       name,
  //       count,
  //       about,
  //       images,
  //       rating,
  //       price,
  //       categoryID,
  //       brandID,
  //       producttypeID,
  //       subcategoryID,
  //       prototypeID,
  //       shippingclassID,
  //       details: JSON.stringify(details),
  //     })
  //   );

  //   console.log(product);
  // };

  const buildProductDetails = () => {
    const details = {};
    optionTypes.forEach((optionType) => {
      const { id, name, category } = optionType;
    })
  }

  const fetchOptionValues = async (optionType: OptionType) => {
    const { id, name, category } = optionType;
    const optType = await DataStore.query(OptionType, id);
    const optValues = await optType?.OptionValues.toArray();
    const options = optValues?.map((option) => ({
      label: option.name,
      value: option.id,
    }));
    setOptionValues(options);
  }

  // replace the inner map function with this in showOptType below
  const renderDetailsForm = (optionTypes: OptionType[]) => {
    return (
      <View style={{ flex: 1, marginHorizontal: 16, marginBottom: 8 }}>
        {optionTypes.map((field, index) => {

          fetchOptionValues(field);

          switch (field.category) {
            case "PRODUCT_DETAILS_TEXT":
              return (
                <Box key={field.id} mb="l">
                  <TextInput
                    placeholder={`${field.placeholder}`}
                    value={values.details[field.name] || ""}
                    onChangeText={(value) =>
                      handleDetailsChange(field.name, value)
                    }
                  />
                </Box>
              );
            case "PRODUCT_DETAILS_SELECT":
              return (
                <Box key={field.id} mb="l">
                  <DropdownComponent
                    mode={"modal"}
                    value={values.details[field.name]}
                    isFocus={isFocus}
                    setIsFocus={setIsFocus}
                    // setValue={(value: string) => handleDetailsChange(field.name, value) }
                    setValue={(value: string) =>
                      setValues({
                        ...values,
                        details: { ...values.details, [field.name]: value },
                      })
                    }
                    data={optionValues}
                  />
                </Box>
              );
            default:
              return null;
          }
        })}
      </View>
    );
  }

  return (
    <View style={{ flex: 1, margin: 8 }}>
      <Text style={{ fontSize: 20, padding: 5 }}>Hello World</Text>
      <Box mb="l">
        <DropdownComponent
          value={productTypeID}
          isFocus={isFocus}
          setIsFocus={setIsFocus}
          setValue={(value: string) =>
            setValues({ ...values, productTypeID: value })
          }
          data={productTypesList}
        />
      </Box>
      <Box>
        <DropdownComponent
          value={subcategoryID}
          isFocus={isFocus}
          setIsFocus={setIsFocus}
          setValue={(value: string) => handleSubCategoryChange(value)}
          data={subList}
        />
      </Box>
      {showOptType && (
        // optionTypes.map(opt => <Text>{opt.name}</Text> )
        <ScrollView style={{ flex: 1 }}>
          {renderDetailsForm(optionTypes)}
        </ScrollView>
      )}
      <Button title="Create Product" onPress={() => {}} />
    </View>
  );
}



export default ProductForm2
