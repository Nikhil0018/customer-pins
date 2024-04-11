import { EnvironmentModel } from './models/environment.model';

export const environment: EnvironmentModel = {
  flags: {
    production: true,
  },

  baseapi: {
    base: 'https://api.first.org/data/v1/',
  },
};
