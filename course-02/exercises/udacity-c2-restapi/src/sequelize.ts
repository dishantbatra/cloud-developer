import {Sequelize} from 'sequelize-typescript';
import { config } from './config/config';

const c = config.dev;
// Instantiate new Sequelize instance!
export const sequelize = new Sequelize({
  "username": process.env.POSTGRES_USERNAME,
  "password": process.env.POSTGRES_PASSWORD,
  "database": process.env.POSTGRES_DATABASE,
  "host":    process.env.POSTGRES_HOST,
  dialect: process.env.POSTGRES_DIALECT,
  storage: ':memory:',
  port:+process.env.POSTGRES_PORT
});

