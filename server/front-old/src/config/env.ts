export const SERVER_HOST = process.env.SERVER_HOST || 'http://84.201.174.242';
export const SERVER_HTTP_PORT = Number(process.env.SERVER_HTTP_PORT) || 3021;
export const SERVER_URL = `${SERVER_HOST}:${SERVER_HTTP_PORT}`
export const SERVER_STATIC_URL = `${SERVER_URL}/static`
