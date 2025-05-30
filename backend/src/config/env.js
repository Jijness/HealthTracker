import dotenv from 'dotenv';
dotenv.config();

export const port = process.env.PORT || 5000;
export const hostname = process.env.HOST_NAME || 'localhost';