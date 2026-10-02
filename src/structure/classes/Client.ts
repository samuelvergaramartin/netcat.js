import { EventEmitter } from "eventemitter3";
import { Socket, io } from "socket.io-client";
import { 
    ClientEventsMap,
    SocketClientEvents,
    SocketServerEvents
} from '../EventNames.js';
import { User } from "./User.js";
import { LoggedPayload } from "../RawData.js";
import { PresenceStatus, PresenceStatusValues } from "../../types/index.js";

export class Client extends EventEmitter<ClientEventsMap> {
    ws: Socket
    token: string | undefined
    user: User | undefined

    constructor(options? : {
        token: string
    }) {
        super();
        if(options?.token) this.token = options.token;

        this.ws = io("https://nerimity.com", {
            transports: ["websocket"],
            autoConnect: false,
        });

        new EventHandlers(this);
    }

    public login(token? : string) {
        if(!this.token) {
            if(!token) throw new Error("NetCatLoginError: A token must be provided.");
            else this.token = token;
        }

        this.ws.connect();
    }
}

class EventHandlers {
    client: Client
    ws: Socket

    constructor(client: Client) {
        this.client = client;
        this.ws = client.ws;

        client.ws.on(SocketServerEvents.CONNECT, this.onConnect.bind(this));
        client.ws.on(
            SocketServerEvents.LOGIN_ERROR,
            this.onLoginError.bind(this),
        );
        client.ws.on(
            SocketServerEvents.LOGGED,
            this.onLogged.bind(this),
        );
    }

    onConnect() {
        this.ws.emit(SocketClientEvents.LOGIN, {
            token: this.client.token,
        });
    }

    onLoginError(payload: { message: string }) {
        throw new Error(JSON.stringify(payload))
    }

    onLogged(payload: LoggedPayload) {
        this.client.user = new User(this.client, payload.user);

        const presence = payload.presences.find((presence) => presence.userId == payload.user.id);
        this.client.user.presence = presence;

        let status : PresenceStatus;

        switch(presence?.status) {
            case PresenceStatusValues.invisible: {
                status = "invisible";
                break;
            }
            case PresenceStatusValues.available: {
                status = "available";
                break;
            }
            case PresenceStatusValues.idle: {
                status = "idle";
                break;
            }
            case PresenceStatusValues.dnd: {
                status = "dnd";
                break;
            }
            default: {
                status = "online";
                break;
            }

            this.client.user?.setStatus(status);
        }

        this.client.emit("ready");
    }
}