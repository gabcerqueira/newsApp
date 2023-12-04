export type UserProfile = {
  _id: string;
  userId: string;
  active: boolean;
  userReadingTime: Object;
  ratedNews: Object;
  likedNews: string[];
  clickedNews: string[];
  readedNews: string[];
  createdAt: string;
  updatedAt: string;
  categories: string[];
};
