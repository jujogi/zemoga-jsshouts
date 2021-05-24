import { IUser } from "./user";

export interface ILocalAuth {
  user: IUser;
  token: string;
}
