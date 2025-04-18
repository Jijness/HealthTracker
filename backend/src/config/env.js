import dotenv from 'dotenv';
dotenv.config();

export const port = process.env.PORT || 8081;
export const hostname = process.env.HOST_NAME || '0.0.0.0';