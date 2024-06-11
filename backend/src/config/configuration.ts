
export default () => ({
    database: {
        type: 'mysql',
        host: process.env.DB_HOST,
        port: 3306,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        autoLoadEntities: true,
        synchronize: true,
        logging: true,
    },
    keycloak: {
        authServerUrl: process.env.KEYCLOAK_URL,
        realm: process.env.KEYCLOAK_REALM,
        clientId: process.env.KEYCLOAK_CLIENT_ID,
        secret: process.env.KEYCLOAK_CLIENT_SECRET
    }
});