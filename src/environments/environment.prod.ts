import { EnvironmentModel } from './models/environment.model';

export const environment: EnvironmentModel = {
  flags: {
    production: true,
  },

  baseapi: {
    base: 'https://api.first.org/data/v1/',
    imgbb_api_key: '2326dc9304e3fba6bc1ed740c49a751e',
  },
};
