interface RequestConfig extends Request {
    method: 'get' | 'post' | 'put' | 'delete';
    url: string;
    params: Record<string, any>;
    data: Record<string, any>;
}
export declare function useRequest(config: RequestConfig): {
    loading: boolean;
    error: string;
    data: undefined;
    refresh: () => Promise<void>;
};
export {};
//# sourceMappingURL=useRequest.d.ts.map