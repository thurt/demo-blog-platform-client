import * as swaggerClient from 'cms-client-api';

const request = swaggerClient.CmsApiFactory(
  undefined,
  'http://172.17.0.1:8282',
);

interface apiError {
  error: string;
  code: number;
}

export {request, apiError};
