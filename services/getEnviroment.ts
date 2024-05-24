export const getEnviroment = () => {
  const envs = [
    {
      label: "dev",
      env: process.env.BACKEND_API_BASE_URL_DEV,
    },
    {
      label: "prod",
      env: process.env.BACKEND_API_BASE_URL,
    },
  ];
  return envs.find((env: any) => env.label === process.env.ENVIROMENT)?.env;
};
