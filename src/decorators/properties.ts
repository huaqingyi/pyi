/*
 * @Author: huaqingyi
 * @LastEditors: huaqingyi
 * @Description: zeconding ...
 */
export interface ConfigurationProperties {
    [x: string]: any;
}

export function useProperties() {

}

export function properties(target: any, key: string);
export function properties(key: string): (target: any, key: string) => void;
export function properties() {
    if (arguments.length === 1) {

    }
    return (target: any, key: string) => {

    }
}
