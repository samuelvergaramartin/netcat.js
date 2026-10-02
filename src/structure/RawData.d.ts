/**
 * Interfaz que representa el Raw de un usuario
 */
export interface RawUser {
  id: string;
  avatar?: string;
  banner?: string;
  username: string;
  bot?: boolean;
  hexColor: string;
  tag: string;
  badges: number;
  joinedAt?: number;
}

/**
 * Interfaz que representa la presencia de un usuario
 */
export interface RawUserPresence {
  status: number;
  userId: string;
  custom?: string;
  activities?: any[]; // TODO
}