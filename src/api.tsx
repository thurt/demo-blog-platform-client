import * as swaggerClient from 'cms-client-api';

const api = swaggerClient.CmsApiFactory(fetch, 'http://172.17.0.1:8282');

export {api};
