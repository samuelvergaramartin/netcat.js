import { RawUser } from "../RawData.js";
import { Client } from './Client.js';
import { type Presence, type PresenceStatus } from "../../types/index.js";

export class User {
  client: Client;
  id: string;
  avatar?: string;
  banner?: string;
  username: string;
  hexColor: string;
  tag: string;
  badges: number;
  joinedAt?: number;
  bot?: boolean;
  presence?: Presence;
  status?: PresenceStatus;
  constructor(client: Client, rawUser: RawUser) {
    this.client = client;
    this.id = rawUser.id;
    this.username = rawUser.username;
    this.tag = rawUser.tag;
    this.hexColor = rawUser.hexColor;
    this.badges = rawUser.badges;
    this.joinedAt = rawUser.joinedAt;
    this.avatar = rawUser.avatar;
    this.banner = rawUser.banner;
    this.bot = rawUser.bot;
  }

  setStatus(status: PresenceStatus) {
    this.status = status;
  }

  toString() {
    return `[@:${this.id}]`;
  }
}