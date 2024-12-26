export interface AuthUser {
  id: string;
  name: string;
  departmentId: string;
  position: string;
  role: string;
}

export interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
  login: (employeeId: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}