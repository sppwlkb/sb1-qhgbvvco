import { Employee } from '../types/department';
import { AuthUser } from '../types/auth';

export function mapEmployeeToUser(employee: Employee): AuthUser {
  return {
    id: employee.id,
    name: employee.name,
    departmentId: employee.departmentId,
    position: employee.position,
    role: employee.role
  };
}