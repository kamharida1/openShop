import { StyleSheet, Text, View } from 'react-native'
import React, { FC, useState } from 'react'
import { Brand, Category, OptionType, Product, ProductType, SubCategory } from '../../src/models'
import { Box } from '../_Theme';
import TextInput from './text_input';
import DropdownComponent from './dropdown';

interface ProductFormT {
  optionTypes: OptionType[];
  showOptType: boolean;
  handleDetailsChange: (name: string, value: string) => void;
  handleSubCategoryChange: (subCatID: string) => void;
  handleChange: (key: string, value: string) => void;
  values: any;
  setValues: any;
  details: any;
  setDetails: any;
  brands: Brand[];
  categories: Category[];
  subCategories: SubCategory[];
  productTypes: ProductType[];
}

const ProductForm: FC<ProductFormT> = ({
  optionTypes,
  showOptType,
  handleChange,
  handleDetailsChange,
  handleSubCategoryChange,
  values,
  setValues,
  details,
  setDetails,
  brands,
  categories,
  subCategories,
  productTypes
}) => {
  const [isFocus, setIsFocus] = useState(false);
  
  const renderDetailsFields = () => {

    const renderOptionValues = field => {
      const options = field.OptionValues.map((option) => ({
        label: option.name,
        value: option.name,
      }));

      return [...options]
    }
    return (
      <View style={{ flex: 1, margin: 8}}>
        {optionTypes.map((field) => {
          switch (field.category) {
            case 'PRODUCT_DETAILS_TEXT':
              return (
                <Box mb="l">
                  <TextInput
                    placeholder={`${field.placeholder}`}
                    value={details[field.name]}
                    onChangeText={(value) =>
                      handleDetailsChange(field.name, value)
                    }
                  />
                </Box>
              );
            case 'PRODUCT_DETAILS_SELECT':
              return (
                <Box mb="l">
                  <DropdownComponent
                    value={details[field.name]}
                    isFocus={isFocus}
                    setIsFocus={setIsFocus}
                    setValue={(value: string) => handleDetailsChange(field.name, value) }
                    data={renderOptionValues(field)}
                  />
                </Box>
              );
            default: 
              return null
          }
        })}
      </View>
    )
  }
  return <View />;
}

export default ProductForm;

const styles = StyleSheet.create({})