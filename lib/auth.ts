export interface Session {
  user: {
    id: string;
    name?: string;
    email: string;
    image?: string;
    username?: string;
  };
}
