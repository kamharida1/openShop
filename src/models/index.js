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

const { OrderProduct, Order, CartItem, Cart, PaymentMethod, ShippingAddress, BillingAddress, Location, ShippingRate, ShippingClass, Prototype, User, SubCategory, ProductType, Brand, OptionValue, OptionType, Category, Product, SubCategoryOptionType, DetailsJson } = initSchema(schema);

export {
  OrderProduct,
  Order,
  CartItem,
  Cart,
  PaymentMethod,
  ShippingAddress,
  BillingAddress,
  Location,
  ShippingRate,
  ShippingClass,
  Prototype,
  User,
  SubCategory,
  ProductType,
  Brand,
  OptionValue,
  OptionType,
  Category,
  Product,
  SubCategoryOptionType,
  OrderStatus,
  PurposeEnum,
  DetailsJson
};