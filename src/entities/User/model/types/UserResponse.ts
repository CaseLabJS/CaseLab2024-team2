export interface UserResponse {
  email: string;
  display_name: string;
  roles: ['USER' | 'ADMIN'];
}