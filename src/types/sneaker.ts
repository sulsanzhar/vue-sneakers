export type TSneaker = {
	id: number;
	title: string;
	price: number;
	imageUrl: string;
	isAdded: boolean;
	isLiked: boolean;
	isLikedId: number;
	isAddedId: number;
	count?: number;
};
