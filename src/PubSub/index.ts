type Callback<Args extends any[] = any[], R = void> = (...args: Args) => R;

type EventMap = Record<string, any[]>;

class PubSub<E extends EventMap = {}> {
	private channels: {
		[K in keyof E]?: Callback<E[K]>[];
	} = {};

	on<K extends keyof E>(key: K, callback: Callback<E[K]>) {
		if (!this.channels[key]) {
			this.channels[key] = [callback];
		} else {
			this.channels[key]?.push(callback);
		}
	}

	emit<K extends keyof E>(key: K, ...args: E[K]) {
		this.channels[key]?.forEach((cb) => cb(...args));
	}

	off<K extends keyof E>(key: K) {
		this.channels[key] = [];
	}

	clear() {
		this.channels = {};
	}
}
