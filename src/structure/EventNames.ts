export const ClientEvents = {
    Ready: "ready"
}

export type ClientEventsMap = {
    ready: () => void
}

export const SocketClientEvents = {
    LOGIN: "user:authenticate"
}

export const SocketServerEvents = {
    CONNECT: "connect",
    LOGIN_ERROR: "user:authenticate_error",
    LOGGED: "user:authenticated"
}