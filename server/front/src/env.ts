export const SERVER_HOST = process.env.AGENT_HOST || 'http://localhost';
export const SERVER_WS_PORT = Number(process.env.SERVER_WS_PORT) || 8021;
export const SERVER_HTTP_PORT = Number(process.env.SERVER_HTTP_PORT) || 3021;