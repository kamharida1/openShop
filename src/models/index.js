// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const OrderStatus = {
  "NEW": "NEW",
  "READY_FOR_PICKUP": "READY_FOR_PICKUP",
  "PICKED_UP": "PICKED_UP",
  "COMPLETED": "COMPLETED",
  "ACCEPTED": "ACCEPTED"
};

const PurposeEnum = {
  "VARIANT": "VARIANT",
  "FEATURE": "FEATURE",
  "PRODUCT_DETAILS_TEXT": "PRODUCT_DETAILS_TEXT",
  "PRODUCT_DETAILS_SELECT": "PRODUCT_DETAILS_SELECT"
};

const { Order, OrderProduct, Basket, BasketProduct, User, SubCategory, ProductType, Address, Brand, OptionValue, OptionType, Category, Product } = initSchema(schema);

export {
  Order,
  OrderProduct,
  Basket,
  BasketProduct,
  User,
  SubCategory,
  ProductType,
  Address,
  Brand,
  OptionValue,
  OptionType,
  Category,
  Product,
  OrderStatus,
  PurposeEnum
};