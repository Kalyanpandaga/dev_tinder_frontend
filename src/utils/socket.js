import io from "socket.io-client";
import { SOCKET_CONNECTION_URL } from "./constants";

export const createSocketConnection = () => {
  return io(SOCKET_CONNECTION_URL);
};
