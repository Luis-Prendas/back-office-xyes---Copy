import {
  EmailSignInRequest,
  EmailSignUpRequest,
  SignSuccessResponse,
} from "../types/authService.types";
import { getEnviroment } from "./getEnviroment";
import { doPost } from "./requestHandler";

/* const authBaseUrl = "http://auth-backoffice-xyes-balancer-1136423868.us-east-2.elb.amazonaws.com" */
const authBaseUrl = getEnviroment() + "/auth_backoffice";

export const emailAndPasswordSignUp = (payload: EmailSignUpRequest) => {
  return doPost<SignSuccessResponse>(`${authBaseUrl}/api/v1/sign-up`, payload);
};

export const emailAndPasswordSignIn = (payload: EmailSignInRequest) => {
  return doPost<SignSuccessResponse>(`${authBaseUrl}/api/v1/sign-in`, payload);
};
