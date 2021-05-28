const devConfig = {
  backendAddress: "http://localhost:3000",
  frontendAddress: "http://localhost:4000",
};

const prodConfig = {
  backendAddress: process.env.REACT_APP_BACKEND_ADDRESS,
  frontendAddress: process.env.REACT_APP_FRONTEND_ADDRESS,
};

const config = process.env.NODE_ENV === "production" ? prodConfig : devConfig;

const constants = {
  ...config,
};

export default constants;
