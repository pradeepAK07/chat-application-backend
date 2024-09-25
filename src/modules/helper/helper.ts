export interface UserSignInResponse {
  accessToken: string;
  user: {
    id: string;
    firstName: string;
    lastName?: string; // Optional, since it can be nullable
    userName: string;
  };
}
