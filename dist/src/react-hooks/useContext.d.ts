/**
 * 简易实现 createContext 和 useContext
 * @param defaultValue
 * @returns
 */
export declare function createContext<T>(defaultValue: T): {
    Provider: (props: {
        value: T;
        children: any;
    }) => any;
    useContext: () => T;
};
//# sourceMappingURL=useContext.d.ts.map