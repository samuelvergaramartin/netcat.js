import { EventEmitter } from "eventemitter3";
import { Socket, io } from "socket.io-client";
import { 
    ClientEventsMap,
    SocketClientEvents,
    SocketServerEvents
} from '../EventNames.js';

export class Client extends EventEmitter<ClientEventsMap> {
    ws: Socket
    token: string | undefined

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

    onLogged(payload: any) {
        this.client.emit("ready");
    }
}