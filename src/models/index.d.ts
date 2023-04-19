import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncItem, AsyncCollection } from "@aws-amplify/datastore";

export enum PurposeEnum {
  VARIANT = "VARIANT",
  FEATURE = "FEATURE",
  PRODUCT_DETAILS_TEXT = "PRODUCT_DETAILS_TEXT",
  PRODUCT_DETAILS_SELECT = "PRODUCT_DETAILS_SELECT"
}



type EagerAddress = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Address, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userID: string;
  readonly User?: User | null;
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
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyAddress = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Address, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userID: string;
  readonly User: AsyncItem<User | undefined>;
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
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Address = LazyLoading extends LazyLoadingDisabled ? EagerAddress : LazyAddress

export declare const Address: (new (init: ModelInit<Address>) => Address) & {
  copyOf(source: Address, mutator: (draft: MutableModel<Address>) => MutableModel<Address> | void): Address;
}

type EagerOrder = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Order, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userID: string;
  readonly User?: User | null;
  readonly Address?: Address | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly orderAddressId?: string | null;
}

type LazyOrder = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Order, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userID: string;
  readonly User: AsyncItem<User | undefined>;
  readonly Address: AsyncItem<Address | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly orderAddressId?: string | null;
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
  readonly quantity: number;
  readonly option?: string | null;
  readonly Product?: Product | null;
  readonly Order?: Order | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly orderProductProductId?: string | null;
  readonly orderProductOrderId?: string | null;
}

type LazyOrderProduct = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<OrderProduct, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly quantity: number;
  readonly option?: string | null;
  readonly Product: AsyncItem<Product | undefined>;
  readonly Order: AsyncItem<Order | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly orderProductProductId?: string | null;
  readonly orderProductOrderId?: string | null;
}

export declare type OrderProduct = LazyLoading extends LazyLoadingDisabled ? EagerOrderProduct : LazyOrderProduct

export declare const OrderProduct: (new (init: ModelInit<OrderProduct>) => OrderProduct) & {
  copyOf(source: OrderProduct, mutator: (draft: MutableModel<OrderProduct>) => MutableModel<OrderProduct> | void): OrderProduct;
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
  readonly phoneNumber?: string | null;
  readonly CartProducts?: (CartProduct | null)[] | null;
  readonly Orders?: (Order | null)[] | null;
  readonly Addresses?: (Address | null)[] | null;
  readonly sub?: string | null;
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
  readonly phoneNumber?: string | null;
  readonly CartProducts: AsyncCollection<CartProduct>;
  readonly Orders: AsyncCollection<Order>;
  readonly Addresses: AsyncCollection<Address>;
  readonly sub?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}

type EagerCartProduct = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<CartProduct, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly quantity: number;
  readonly option?: string | null;
  readonly Product?: Product | null;
  readonly userID: string;
  readonly User?: User | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly cartProductProductId?: string | null;
}

type LazyCartProduct = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<CartProduct, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly quantity: number;
  readonly option?: string | null;
  readonly Product: AsyncItem<Product | undefined>;
  readonly userID: string;
  readonly User: AsyncItem<User | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly cartProductProductId?: string | null;
}

export declare type CartProduct = LazyLoading extends LazyLoadingDisabled ? EagerCartProduct : LazyCartProduct

export declare const CartProduct: (new (init: ModelInit<CartProduct>) => CartProduct) & {
  copyOf(source: CartProduct, mutator: (draft: MutableModel<CartProduct>) => MutableModel<CartProduct> | void): CartProduct;
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
  readonly prototypeID: string;
  readonly Prototype?: Prototype | null;
  readonly OptionValues?: (OptionValue | null)[] | null;
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
  readonly prototypeID: string;
  readonly Prototype: AsyncItem<Prototype | undefined>;
  readonly OptionValues: AsyncCollection<OptionValue>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type OptionType = LazyLoading extends LazyLoadingDisabled ? EagerOptionType : LazyOptionType

export declare const OptionType: (new (init: ModelInit<OptionType>) => OptionType) & {
  copyOf(source: OptionType, mutator: (draft: MutableModel<OptionType>) => MutableModel<OptionType> | void): OptionType;
}

type EagerPrototype = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Prototype, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly Category?: Category | null;
  readonly OptionTypes?: (OptionType | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly prototypeCategoryId?: string | null;
}

type LazyPrototype = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Prototype, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly Category: AsyncItem<Category | undefined>;
  readonly OptionTypes: AsyncCollection<OptionType>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly prototypeCategoryId?: string | null;
}

export declare type Prototype = LazyLoading extends LazyLoadingDisabled ? EagerPrototype : LazyPrototype

export declare const Prototype: (new (init: ModelInit<Prototype>) => Prototype) & {
  copyOf(source: Prototype, mutator: (draft: MutableModel<Prototype>) => MutableModel<Prototype> | void): Prototype;
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
  readonly Prototype?: Prototype | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly categoryPrototypeId?: string | null;
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
  readonly Prototype: AsyncItem<Prototype | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly categoryPrototypeId?: string | null;
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
  readonly CartProduct?: CartProduct | null;
  readonly OrderProduct?: OrderProduct | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly productCartProductId?: string | null;
  readonly productOrderProductId?: string | null;
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
  readonly CartProduct: AsyncItem<CartProduct | undefined>;
  readonly OrderProduct: AsyncItem<OrderProduct | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly productCartProductId?: string | null;
  readonly productOrderProductId?: string | null;
}

export declare type Product = LazyLoading extends LazyLoadingDisabled ? EagerProduct : LazyProduct

export declare const Product: (new (init: ModelInit<Product>) => Product) & {
  copyOf(source: Product, mutator: (draft: MutableModel<Product>) => MutableModel<Product> | void): Product;
}