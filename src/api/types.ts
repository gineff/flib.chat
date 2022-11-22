export type APIError = {
  response: { reason: string };
};

export type User = {
  id: number;
  login: string;
  first_name: string;
  second_name: string;
  display_name: string;
  avatar: string;
  phone: string;
  email: string;
};

export type UserT = {
  id: number;
  login: string;
  firstName: string;
  secondName: string;
  displayName: string;
  avatar: string;
  phone: string;
  email: string;
};

export type PasswordData = {
  oldPassword: string;
  newPassword: string;
};

export type ProfileData = Omit<User, "id" | "avatar">;

export type ProfileDataT = Omit<UserT, "id" | "avatar">;

export type Chat = {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  last_message: {
    user: User;
    time: string;
    content: string;
  };
};

export type ChatT = {
  id: number;
  title: string;
  avatar: string;
  unreadCount: number;
  lastMessage: {
    user: User;
    time: string;
    content: string;
  };
};

export type SigninData = {
  login: string;
  password: string;
};

export type SignupData = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};
