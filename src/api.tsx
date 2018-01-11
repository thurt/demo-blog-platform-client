import * as swaggerClient from 'cms-client-api';

const request = swaggerClient.CmsApiFactory(
  undefined,
  'http://172.17.0.1:8282',
);

// apiError is the interface returned by the api in the response body when a request error has occurred. Common examples of request errors that would cause the server to respond with an apiError would be when the the request contains invalid or missing values, or when a request is made for a non-existant entity.
interface apiError {
  error: string;
  code: number;
}

export {request, apiError};
