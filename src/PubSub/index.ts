class PubSub {
	channels: Record<string, Function[]> = {};

	on(key: string, callback: Function) {
		if (!this.channels.key) {
			this.channels[key] = [callback];
		} else {
			this.channels[key]?.push(callback);
		}
	}

	emit(key: string, ...args: any[]) {
		this.channels[key]?.forEach((cb) => cb(args));
	}

	off(key: string) {
		this.channels[key] = [];
	}

	clear() {
		this.channels = {};
	}
}

export const pubsub = new PubSub();
