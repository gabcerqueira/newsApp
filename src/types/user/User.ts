import { UserProfile } from "./UserProfile";

export type User = {
  name: string;
  email: string;
  active: boolean;
  _id: string;
  userProfile: UserProfile;
  password?: string;
};
