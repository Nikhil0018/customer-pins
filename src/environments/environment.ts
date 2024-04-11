import { EnvironmentModel } from './models/environment.model';

export const environment: EnvironmentModel = {
  flags: {
    production: false,
  },

  baseapi: {
    base: 'https://api.first.org/data/v1/',
  },
};
