import type { TSneaker } from './sneaker';

export type TOrders = {
	id: number;
	sneakers: TSneaker[];
	price: number;
	date: Date;
};
