const {
  NODE_ENV = 'development',
  // We'll have to figure out how to make provider type + ids work
  BASE_URL = 'http://localhost:8080/api/v1/'
} = process.env;

export function getBaseUrl() {
  if (NODE_ENV && NODE_ENV !== 'production') {
    return `http://localhost:8080/api/mock/`;
  } else {
    return BASE_URL;
  }
}
