/**
 * 简易实现 createContext 和 useContext
 * @param defaultValue
 * @returns
 */

export function createContext<T>(defaultValue: T) {
	let currentValue = defaultValue;
	let listeners: Function[] = [];

	function Provider(props: { value: T; children: any }) {
		currentValue = props.value;

		// 通知所有使用 useContext 的组件更新
		listeners.forEach((fn) => fn(currentValue));
		return props.children;
	}

	function useContext() {
		const [state, setState] = useState(currentValue);

		// 订阅 Provider 更新，在 useEffect 中，因为组件每次重新渲染都要执行
		useEffect(() => {
			const listener = (val: any) => setState(val);
			listeners.push(listener);

			return () => {
				listeners = listeners.filter((fn) => fn !== listener);
			};
		}, []);

		return state;
	}

	return { Provider, useContext };
}

/* 使用


const ThemeContext = createContext('light');

function App() {
	const [theme, setTheme] = useState('dark');

	return (
		<ThemeContext.Provider value={theme}>
			<Child />
			<button onClick={() => setTheme('light')}>toggle</button>
		</ThemeContext.Provider>
	);
}

function Child() {
	const theme = ThemeContext.useContext();

	return <div>{theme}</div>;
}

*/
