interface AjaxConfig {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    url: string;
    params?: Record<string, any>;
    data?: Document | XMLHttpRequestBodyInit | null | undefined;
}
export declare function ajax(config: AjaxConfig, cb: Function): void;
export {};
//# sourceMappingURL=index.d.ts.map