import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection, AsyncItem } from "@aws-amplify/datastore";

export enum OrderStatus {
  NEW = "NEW",
  READY_FOR_PICKUP = "READY_FOR_PICKUP",
  PICKED_UP = "PICKED_UP",
  COMPLETED = "COMPLETED",
  ACCEPTED = "ACCEPTED"
}

export enum PurposeEnum {
  VARIANT = "VARIANT",
  FEATURE = "FEATURE",
  PRODUCT_DETAILS_TEXT = "PRODUCT_DETAILS_TEXT",
  PRODUCT_DETAILS_SELECT = "PRODUCT_DETAILS_SELECT"
}



type EagerOrder = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Order, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly OrderProducts?: (OrderProduct | null)[] | null;
  readonly total: number;
  readonly status?: OrderStatus | keyof typeof OrderStatus | null;
  readonly userID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyOrder = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Order, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly OrderProducts: AsyncCollection<OrderProduct>;
  readonly total: number;
  readonly status?: OrderStatus | keyof typeof OrderStatus | null;
  readonly userID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Order = LazyLoading extends LazyLoadingDisabled ? EagerOrder : LazyOrder

export declare const Order: (new (init: ModelInit<Order>) => Order) & {
  copyOf(source: Order, mutator: (draft: MutableModel<Order>) => MutableModel<Order> | void): Order;
}

type EagerOrderProduct = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<OrderProduct, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly quantity?: number | null;
  readonly Product?: Product | null;
  readonly orderID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly orderProductProductId?: string | null;
}

type LazyOrderProduct = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<OrderProduct, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly quantity?: number | null;
  readonly Product: AsyncItem<Product | undefined>;
  readonly orderID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly orderProductProductId?: string | null;
}

export declare type OrderProduct = LazyLoading extends LazyLoadingDisabled ? EagerOrderProduct : LazyOrderProduct

export declare const OrderProduct: (new (init: ModelInit<OrderProduct>) => OrderProduct) & {
  copyOf(source: OrderProduct, mutator: (draft: MutableModel<OrderProduct>) => MutableModel<OrderProduct> | void): OrderProduct;
}

type EagerBasket = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Basket, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly BasketProducts?: (BasketProduct | null)[] | null;
  readonly userID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyBasket = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Basket, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly BasketProducts: AsyncCollection<BasketProduct>;
  readonly userID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Basket = LazyLoading extends LazyLoadingDisabled ? EagerBasket : LazyBasket

export declare const Basket: (new (init: ModelInit<Basket>) => Basket) & {
  copyOf(source: Basket, mutator: (draft: MutableModel<Basket>) => MutableModel<Basket> | void): Basket;
}

type EagerBasketProduct = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<BasketProduct, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly quantity: number;
  readonly Product?: Product | null;
  readonly basketID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly basketProductProductId?: string | null;
}

type LazyBasketProduct = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<BasketProduct, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly quantity: number;
  readonly Product: AsyncItem<Product | undefined>;
  readonly basketID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly basketProductProductId?: string | null;
}

export declare type BasketProduct = LazyLoading extends LazyLoadingDisabled ? EagerBasketProduct : LazyBasketProduct

export declare const BasketProduct: (new (init: ModelInit<BasketProduct>) => BasketProduct) & {
  copyOf(source: BasketProduct, mutator: (draft: MutableModel<BasketProduct>) => MutableModel<BasketProduct> | void): BasketProduct;
}

type EagerUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly email: string;
  readonly firstName?: string | null;
  readonly lastName?: string | null;
  readonly sub: string;
  readonly Addresses?: (Address | null)[] | null;
  readonly phone?: string | null;
  readonly Baskets?: (Basket | null)[] | null;
  readonly Orders?: (Order | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly email: string;
  readonly firstName?: string | null;
  readonly lastName?: string | null;
  readonly sub: string;
  readonly Addresses: AsyncCollection<Address>;
  readonly phone?: string | null;
  readonly Baskets: AsyncCollection<Basket>;
  readonly Orders: AsyncCollection<Order>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}

type EagerSubCategory = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<SubCategory, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly Products?: (Product | null)[] | null;
  readonly OptionTypes?: (OptionType | null)[] | null;
  readonly categoryID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazySubCategory = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<SubCategory, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly Products: AsyncCollection<Product>;
  readonly OptionTypes: AsyncCollection<OptionType>;
  readonly categoryID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type SubCategory = LazyLoading extends LazyLoadingDisabled ? EagerSubCategory : LazySubCategory

export declare const SubCategory: (new (init: ModelInit<SubCategory>) => SubCategory) & {
  copyOf(source: SubCategory, mutator: (draft: MutableModel<SubCategory>) => MutableModel<SubCategory> | void): SubCategory;
}

type EagerProductType = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ProductType, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Products?: (Product | null)[] | null;
  readonly Categories?: (Category | null)[] | null;
  readonly name: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyProductType = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ProductType, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Products: AsyncCollection<Product>;
  readonly Categories: AsyncCollection<Category>;
  readonly name: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type ProductType = LazyLoading extends LazyLoadingDisabled ? EagerProductType : LazyProductType

export declare const ProductType: (new (init: ModelInit<ProductType>) => ProductType) & {
  copyOf(source: ProductType, mutator: (draft: MutableModel<ProductType>) => MutableModel<ProductType> | void): ProductType;
}

type EagerAddress = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Address, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly address: string;
  readonly subAddress?: string | null;
  readonly city?: string | null;
  readonly country: string;
  readonly fullAddress: string;
  readonly lat?: number | null;
  readonly lng?: number | null;
  readonly location?: string | null;
  readonly postCode?: string | null;
  readonly state?: string | null;
  readonly isSelected?: boolean | null;
  readonly userID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyAddress = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Address, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly address: string;
  readonly subAddress?: string | null;
  readonly city?: string | null;
  readonly country: string;
  readonly fullAddress: string;
  readonly lat?: number | null;
  readonly lng?: number | null;
  readonly location?: string | null;
  readonly postCode?: string | null;
  readonly state?: string | null;
  readonly isSelected?: boolean | null;
  readonly userID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Address = LazyLoading extends LazyLoadingDisabled ? EagerAddress : LazyAddress

export declare const Address: (new (init: ModelInit<Address>) => Address) & {
  copyOf(source: Address, mutator: (draft: MutableModel<Address>) => MutableModel<Address> | void): Address;
}

type EagerBrand = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Brand, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly Products?: (Product | null)[] | null;
  readonly logo?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyBrand = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Brand, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly Products: AsyncCollection<Product>;
  readonly logo?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Brand = LazyLoading extends LazyLoadingDisabled ? EagerBrand : LazyBrand

export declare const Brand: (new (init: ModelInit<Brand>) => Brand) & {
  copyOf(source: Brand, mutator: (draft: MutableModel<Brand>) => MutableModel<Brand> | void): Brand;
}

type EagerOptionValue = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<OptionValue, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly optiontypeID: string;
  readonly OptionType?: OptionType | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyOptionValue = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<OptionValue, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly optiontypeID: string;
  readonly OptionType: AsyncItem<OptionType | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type OptionValue = LazyLoading extends LazyLoadingDisabled ? EagerOptionValue : LazyOptionValue

export declare const OptionValue: (new (init: ModelInit<OptionValue>) => OptionValue) & {
  copyOf(source: OptionValue, mutator: (draft: MutableModel<OptionValue>) => MutableModel<OptionValue> | void): OptionValue;
}

type EagerOptionType = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<OptionType, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly value?: string | null;
  readonly placeholder?: string | null;
  readonly category?: PurposeEnum | keyof typeof PurposeEnum | null;
  readonly OptionValues?: (OptionValue | null)[] | null;
  readonly subcategoryID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyOptionType = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<OptionType, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly value?: string | null;
  readonly placeholder?: string | null;
  readonly category?: PurposeEnum | keyof typeof PurposeEnum | null;
  readonly OptionValues: AsyncCollection<OptionValue>;
  readonly subcategoryID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type OptionType = LazyLoading extends LazyLoadingDisabled ? EagerOptionType : LazyOptionType

export declare const OptionType: (new (init: ModelInit<OptionType>) => OptionType) & {
  copyOf(source: OptionType, mutator: (draft: MutableModel<OptionType>) => MutableModel<OptionType> | void): OptionType;
}

type EagerCategory = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Category, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly description?: string | null;
  readonly image?: string | null;
  readonly Products?: (Product | null)[] | null;
  readonly producttypeID: string;
  readonly SubCategories?: (SubCategory | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyCategory = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Category, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly description?: string | null;
  readonly image?: string | null;
  readonly Products: AsyncCollection<Product>;
  readonly producttypeID: string;
  readonly SubCategories: AsyncCollection<SubCategory>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Category = LazyLoading extends LazyLoadingDisabled ? EagerCategory : LazyCategory

export declare const Category: (new (init: ModelInit<Category>) => Category) & {
  copyOf(source: Category, mutator: (draft: MutableModel<Category>) => MutableModel<Category> | void): Category;
}

type EagerProduct = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Product, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly count: number;
  readonly about: string;
  readonly images?: string[] | null;
  readonly rating?: number | null;
  readonly colors?: (string | null)[] | null;
  readonly details?: string | null;
  readonly price: number;
  readonly mockPrice?: number | null;
  readonly wholesalePrice?: number | null;
  readonly wholesalePromoPrice?: number | null;
  readonly features?: (string | null)[] | null;
  readonly published?: boolean | null;
  readonly model?: string | null;
  readonly isFeatured?: boolean | null;
  readonly isPromoted?: boolean | null;
  readonly promoPrice?: number | null;
  readonly categoryID: string;
  readonly Category: Category;
  readonly brandID: string;
  readonly Brand?: Brand | null;
  readonly producttypeID: string;
  readonly subcategoryID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyProduct = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Product, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly count: number;
  readonly about: string;
  readonly images?: string[] | null;
  readonly rating?: number | null;
  readonly colors?: (string | null)[] | null;
  readonly details?: string | null;
  readonly price: number;
  readonly mockPrice?: number | null;
  readonly wholesalePrice?: number | null;
  readonly wholesalePromoPrice?: number | null;
  readonly features?: (string | null)[] | null;
  readonly published?: boolean | null;
  readonly model?: string | null;
  readonly isFeatured?: boolean | null;
  readonly isPromoted?: boolean | null;
  readonly promoPrice?: number | null;
  readonly categoryID: string;
  readonly Category: AsyncItem<Category>;
  readonly brandID: string;
  readonly Brand: AsyncItem<Brand | undefined>;
  readonly producttypeID: string;
  readonly subcategoryID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Product = LazyLoading extends LazyLoadingDisabled ? EagerProduct : LazyProduct

export declare const Product: (new (init: ModelInit<Product>) => Product) & {
  copyOf(source: Product, mutator: (draft: MutableModel<Product>) => MutableModel<Product> | void): Product;
}