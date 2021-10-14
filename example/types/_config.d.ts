import { useProperties, properties, ConfigurationProperties } from 'pyi';

declare module 'pyi' {
    interface ConfigurationProperties {
        APP_AUOTLOAD: object;
        APP_RUNTIME: string;
        PORT: number;
        DATABASE_HOST: string;
        DATABASE_PORT: number;
        DATABASE_DB: string;
    }
    function useProperties<T = any>(key: 'APP_AUOTLOAD' | 'APP_RUNTIME' | 'PORT' | 'DATABASE_HOST' | 'DATABASE_PORT' | 'DATABASE_DB'): T;
    function useProperties<T = any>(): T;
    function properties<T = any>(key: 'APP_AUOTLOAD' | 'APP_RUNTIME' | 'PORT' | 'DATABASE_HOST' | 'DATABASE_PORT' | 'DATABASE_DB'): (target: any, key: string) => void;
    function properties(target: any, key: string);
}