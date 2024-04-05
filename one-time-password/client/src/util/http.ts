import {
    CLOUD_FUNCTION_CREATE_USER,
    CLOUD_FUNCTION_REQUEST_OTP,
    CLOUD_FUNCTION_VERIFY_OTP,
} from '@env';
import axios, { AxiosError, AxiosResponse } from 'axios';

type SignupRequest = {
    email: string;
    phone: string;
};

type SignUpResponse = AxiosResponse<{
    uid: string;
    email: string;
}>;

type RequestOTPRequest = {
    phone: string;
};

type RequestOTPResponse = AxiosResponse<{
    message: string;
}>;

type LoginRequest = {
    phone: string;
    code: string;
};

type LoginResponse = AxiosResponse<{
    message: string;
    token: string;
}>;

export async function signUp(email: string, phone: string) {
    try {
        const response = await axios.post<SignupRequest, SignUpResponse>(
            CLOUD_FUNCTION_CREATE_USER,
            {
                email,
                phone,
            }
        );
        return response.data;
    } catch (err: unknown) {
        if (err instanceof AxiosError) {
            console.log(
                JSON.stringify(
                    {
                        code: err.code,
                        message: err.message,
                    },
                    null,
                    2
                )
            );
        } else {
            console.log((err as Error).message);
        }
        /** throw error to outer scope */
        throw err;
    }
}

export async function requestOTP(phone: string) {
    try {
        const response = await axios.post<
            RequestOTPRequest,
            RequestOTPResponse
        >(CLOUD_FUNCTION_REQUEST_OTP, {
            phone,
        });
        return response.data;
    } catch (err: unknown) {
        if (err instanceof AxiosError) {
            console.log(
                JSON.stringify(
                    {
                        code: err.code,
                        message: err.message,
                    },
                    null,
                    2
                )
            );
        } else {
            console.log((err as Error).message);
        }
        /** throw error to outer scope */
        throw err;
    }
}

export async function login(phone: string, code: string) {
    try {
        const response = await axios.post<LoginRequest, LoginResponse>(
            CLOUD_FUNCTION_VERIFY_OTP,
            {
                code,
                phone,
            }
        );
        return response.data;
    } catch (err: unknown) {
        if (err instanceof AxiosError) {
            console.log(
                JSON.stringify(
                    {
                        code: err.code,
                        message: err.message,
                    },
                    null,
                    2
                )
            );
        } else {
            console.log((err as Error).message);
        }
        /** throw error to outer scope */
        throw err;
    }
}
