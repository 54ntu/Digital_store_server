
interface EnvConfig {
    port: string | number;
    postgresUri: string | undefined;
    accessTokenSecret: string;
    accessTokenExpiry: string;
    useremail: string;
    useremailpassword: string;
    adminemail: string;
    adminpassword: string;
    adminusername: string;
    NODE_ENV: string
}


export const envConfig: EnvConfig = {
    port: process.env.PORT || 4000,
    postgresUri: process.env.POSTGRES_URI,
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET!,
    accessTokenExpiry: process.env.ACCESS_TOKEN_EXPIRY!,
    useremail: process.env.USER_EMAIL!,
    useremailpassword: process.env.USER_EMAIL_PASSWORD!,
    adminemail: process.env.ADMIN_EMAIL!,
    adminpassword: process.env.ADMIN_PASSWORD!,
    adminusername: process.env.ADMIN_USERNAME!,
    NODE_ENV: process.env.NODE_ENV!
}