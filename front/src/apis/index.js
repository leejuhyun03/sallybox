import axios from "axios";
import { ResponseDto } from './response';
import { CheckCertificationRequestDto, EmailCertificationRequestDto, SignUpRequestDto } from "./request/auth";
import { CheckCertificationResponseDto, EmailCertificationResponseDto, SignUpResponseDto } from "./response/auth";

const responseHandler = (response) => {
    const responseBody = response.data;
    return responseBody;
};

const errorHandler = (error) => {
    if (!error.response || !error.response.data) return null;
    const responseBody = error.response.data;
    return responseBody; 
};

const DOMAIN = "http://localhost:8085";
const API_DOMAIN = `${DOMAIN}/api/v1`;

export const SNS_SIGN_IN_URL = (type) => `${API_DOMAIN}/auth/oauth2/${type}`;
const SIGN_UP_URL = () => `${API_DOMAIN}/auth/sign-up`;
const EMAIL_CERTIFICATION_URL = () => `${API_DOMAIN}/auth/email-certification`;
const CHECK_CERTIFICATION_URL = () => `${API_DOMAIN}/auth/check-certification`;

export const signUpRequest = async (requestBody) => {
    const result = await axios.post(SIGN_UP_URL(), requestBody)
        .then(responseHandler)
        .catch(errorHandler);
    return result;
};

export const emailCertificationRequest = async (requestBody) => {
    const result = await axios.post(EMAIL_CERTIFICATION_URL(), requestBody)
        .then(responseHandler)
        .catch(errorHandler);
    return result;
};

export const checkCertificationRequest = async (requestBody) => {
    const result = await axios.post(CHECK_CERTIFICATION_URL(), requestBody)
        .then(responseHandler)
        .catch(errorHandler);
    return result;
};
