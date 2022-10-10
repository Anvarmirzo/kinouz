import {UserModel} from './user';
import {FileModel} from './global';
import {CategoryModel, CountryModel, GenreModel} from './movie';

export class SubscriptionModel {
	id: number;
	type: SubscriptionType;
	active: boolean;
	expirationAt: Date;
	user?: UserModel;

	constructor(subscription: SubscriptionModel) {
		this.id = subscription.id;
		this.active = subscription.active;
		this.expirationAt = new Date(subscription.expirationAt);
		this.type = new SubscriptionType(subscription.type);

		if (subscription.user) {
			this.user = new UserModel(subscription.user);
		}
	}
}

export class SubscriptionType {
	id: number;
	title: string;
	description: string;
	price?: number;
	poster?: FileModel;
	genres?: GenreModel[];
	countries?: CountryModel[];
	categories?: CategoryModel[];

	constructor(type: SubscriptionType) {
		this.id = type.id;
		this.title = type.title;
		this.description = type.description;

		if (type.price) {
			this.price = type.price;
		}

		if (type.poster) {
			this.poster = new FileModel(type.poster);
		}

		if (type.genres) {
			this.genres = type.genres.map((g) => new GenreModel(g));
		}

		if (type.countries) {
			this.countries = type.countries.map((c) => new CountryModel(c));
		}

		if (type.categories) {
			this.categories = type.categories.map((c) => new CategoryModel(c));
		}
	}
}
