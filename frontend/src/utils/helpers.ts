export function canAccess(userRole: string, requiredRoles: string[]): boolean {
  return requiredRoles.includes(userRole);
}

export function formatDateTime(date: string | Date): string {
  return new Date(date).toLocaleString();
}

export function formatTime(date: string | Date): string {
  return new Date(date).toLocaleTimeString();
}

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString();
}

export function calculateWorkHours(checkIn: string, checkOut: string): number {
  const checkInTime = new Date(checkIn).getTime();
  const checkOutTime = new Date(checkOut).getTime();
  return (checkOutTime - checkInTime) / (1000 * 60 * 60);
}
