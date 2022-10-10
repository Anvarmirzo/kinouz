import {FileModel} from './global';
import {CategoryModel, CountryModel, GenreModel} from './movie';

export enum ePaymentType {
	Click = 1,
	PayMe = 2,
}

export enum ePaymentStatusType {
	Pending = 1,
	Success = 2,
	Fail = 3,
}

export interface IPostPayment {
	typeId: ePaymentType;
	userId: number;
	summa: number;
	statusId?: ePaymentStatusType;
}

export class PaymentModel {
	id: number;
	type: {
		id: ePaymentType;
		title: keyof typeof ePaymentType;
	};
	status: {
		id: ePaymentStatusType;
		title: string;
	};
	user: {
		id: number;
		name: string;
	};
	summa: number;
	createdAt: Date;

	constructor(payment: PaymentModel) {
		this.id = payment.id;
		this.type = payment.type;
		this.status = payment.status;
		this.user = payment.user;
		this.summa = payment.summa;
		this.createdAt = new Date(payment.createdAt);
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
