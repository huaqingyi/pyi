import { useProperties, properties, ConfigurationProperties } from 'pyi';

declare module 'pyi' {
    interface ConfigurationProperties {
        PORT: number;
        DATABASE_HOST: string;
        DATABASE_PORT: number;
        DATABASE_DB: string;
    }
    function useProperties<T = any>(key: 'PORT' | 'DATABASE_HOST' | 'DATABASE_PORT' | 'DATABASE_DB'): T;
    function useProperties<T = any>(): T;
    function properties<T = any>(key: 'PORT' | 'DATABASE_HOST' | 'DATABASE_PORT' | 'DATABASE_DB'): (target: any, key: string) => void;
    function properties(target: any, key: string);
}