import { RawUserPresence } from '../structure/RawData.js';

/**
 * Representa la presencia de un usuario
 */
export type Presence = Omit<RawUserPresence, "userId">;

/**
 * Representa los diferentes tipos de estados de presencia
 */
export type PresenceStatus = "invisible" | "online" | "available" | "idle" | "dnd"

/**
 * Representa los valores númericos de los estados de presencia
 */
export enum PresenceStatusValues {
    "invisible" = 0,
    "online" = 1,
    "available" = 2,
    "idle" = 3,
    "dnd" = 4
}

/**
 * Representa los métodos HTTP que existen
 */

export type HTTPMethods = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";