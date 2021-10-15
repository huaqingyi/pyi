import { useProperties, properties, ConfigurationProperties } from 'pyi';

declare module 'pyi' {
    interface ConfigurationProperties {
        APPLICATION_PATH: string;
        APP_PATH: string;
        APP_AUOTLOAD: object;
        APP_RUNTIME: string;
        PORT: number;
        HOST: string;
        mode: string;
        DATABASE_TYPE: string;
        DATABASE_HOST: string;
        DATABASE_PORT: number;
        DATABASE_USERNAME: string;
        DATABASE_PASSWORD: string;
        DATABASE_SYNCHRONIZE: number;
        DATABASE_LOGGING: number;
        DATABASE_DB: string;
    }
    function useProperties<T = any>(key: 'APPLICATION_PATH' | 'APP_PATH' | 'APP_AUOTLOAD' | 'APP_RUNTIME' | 'PORT' | 'HOST' | 'mode' | 'DATABASE_TYPE' | 'DATABASE_HOST' | 'DATABASE_PORT' | 'DATABASE_USERNAME' | 'DATABASE_PASSWORD' | 'DATABASE_SYNCHRONIZE' | 'DATABASE_LOGGING' | 'DATABASE_DB'): T;
    function useProperties<T = any>(): T;
    function properties<T = any>(key: 'APPLICATION_PATH' | 'APP_PATH' | 'APP_AUOTLOAD' | 'APP_RUNTIME' | 'PORT' | 'HOST' | 'mode' | 'DATABASE_TYPE' | 'DATABASE_HOST' | 'DATABASE_PORT' | 'DATABASE_USERNAME' | 'DATABASE_PASSWORD' | 'DATABASE_SYNCHRONIZE' | 'DATABASE_LOGGING' | 'DATABASE_DB'): (target: any, key: string) => void;
    function properties(target: any, key: string);
}