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

/**
 * Interfaz que representa el payload que recibimos cuando iniciamos sesión
 */
export interface LoggedPayload {
  user: RawUser;
  servers: any[]; // TODO
  serverMembers: any[]; // TODO
  messageMentions: any[]; // TODO
  channels: any[]; // TODO
  serverRoles: any[]; // TODO
  presences: RawUserPresence[];
  friends: any[]; // TODO
  inbox: any[]; // TODO
  lastSeenServerChannelIds: Record<string, number>;
}