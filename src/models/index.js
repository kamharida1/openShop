// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const PurposeEnum = {
  "VARIANT": "VARIANT",
  "FEATURE": "FEATURE",
  "PRODUCT_DETAILS_TEXT": "PRODUCT_DETAILS_TEXT",
  "PRODUCT_DETAILS_SELECT": "PRODUCT_DETAILS_SELECT"
};

const { Address, Order, OrderProduct, User, CartProduct, Brand, OptionValue, OptionType, Prototype, Category, Product } = initSchema(schema);

export {
  Address,
  Order,
  OrderProduct,
  User,
  CartProduct,
  Brand,
  OptionValue,
  OptionType,
  Prototype,
  Category,
  Product,
  PurposeEnum
};