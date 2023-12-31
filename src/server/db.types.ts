import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type Account = {
  id: string;
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token: string | null;
  access_token: string | null;
  expires_at: number | null;
  token_type: string | null;
  scope: string | null;
  id_token: string | null;
  session_state: string | null;
};
export type Entry = {
  id: Generated<number>;
  name: string;
  createdAt: Generated<Timestamp>;
  updatedAt: Timestamp;
  entryDate: Timestamp;
  userId: string;
};
export type Food = {
  id: Generated<number>;
  name: string;
  createdAt: Generated<Timestamp>;
  updatedAt: Timestamp;
  carbs: Generated<number | null>;
  protein: Generated<number | null>;
  fat: Generated<number | null>;
  calories: Generated<number | null>;
  userId: string;
  recipeId: number | null;
};
export type FoodIngredient = {
  createdAt: Generated<Timestamp>;
  updatedAt: Timestamp;
  foodId: number;
  ingredientId: number;
};
export type FoodsOfEntries = {
  createdAt: Generated<Timestamp>;
  updatedAt: Timestamp;
  foodId: number;
  entryId: number;
};
export type Ingredient = {
  id: Generated<number>;
  name: string;
  createdAt: Generated<Timestamp>;
  updatedAt: Timestamp;
  carbs: Generated<number>;
  protein: Generated<number>;
  fat: Generated<number>;
  calories: Generated<number>;
  creatorId: string | null;
};
export type Post = {
  id: Generated<number>;
  name: string;
  createdAt: Generated<Timestamp>;
  updatedAt: Timestamp;
  createdById: string;
};
export type Recipe = {
  id: Generated<number>;
  name: string;
  createdAt: Generated<Timestamp>;
  updatedAt: Timestamp;
  creatorId: string;
};
export type Session = {
  id: string;
  sessionToken: string;
  userId: string;
  expires: Timestamp;
};
export type User = {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: Timestamp | null;
  image: string | null;
};
export type VerificationToken = {
  identifier: string;
  token: string;
  expires: Timestamp;
};
export type DB = {
  Account: Account;
  Entry: Entry;
  Food: Food;
  FoodIngredient: FoodIngredient;
  FoodsOfEntries: FoodsOfEntries;
  Ingredient: Ingredient;
  Post: Post;
  Recipe: Recipe;
  Session: Session;
  User: User;
  VerificationToken: VerificationToken;
};
