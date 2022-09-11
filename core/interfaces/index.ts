import {ReactElement} from 'react';

export interface ILinkObj {
	name: string;
	href: string;
	icon: ReactElement;
	current: boolean;
}

export interface IStatus {
	id: number;
	title: string;
}

export interface IType {
	id: number;
	title: string;
	createdAt?: string;
	updatedAt?: string;
}

export interface ILogIn {
	email: string;
	password: string;
}

export interface ISignUp {
	name: string;
	email: string;
	password: string;
}

export interface IAutoComplete {
	index: string;
	search: string;
	filter?: string[];
}

export interface IRole {
	id: number;
	title: string;
}

export interface IActor {
	id: number;
	avatar: IFile;
	name: string;
	slug: string;
	movies?: MovieModel[];
	createdAt: string;
}

export interface ICategory {
	id: number;
	title: string;
}

export interface IComment {
	id: number;
	user: any;
	movie?: MovieModel;
	text: string;
	createdAt: string;
}

export interface ICountry {
	id: number;
	title: string;
	slug: string;
	movie?: MovieModel[];
	createdAt: string;
}

export interface IGenre {
	id: number;
	title: string;
	slug: string;
	movie?: MovieModel[];
	createdAt: string;
}

export class MovieModel {
	createdAt: Date;
	id: number;
	title: string;
	slug: string;
	poster?: IFile;
	description?: string;
	isNew: boolean;
	isSerial: boolean;
	bySubscription: boolean;
	imdb?: number;
	rating?: number;
	ageRemark: number;
	year: number;
	genres?: IGenre[];
	countries?: ICountry[];
	actors?: IActor[];
	comments?: IComment[];
	categories?: ICategory[];
	producers?: IProducer[];
	seasons?: ISeason[];
	treiler?: IFile;
	file?: IMovieFile;

	constructor(movie: MovieModel) {
		this.id = movie.id;
		this.slug = movie.slug;
		this.title = movie.title;
		this.isNew = movie.isNew;
		this.year = movie.year;
		this.isSerial = movie.isSerial;
		this.ageRemark = movie.ageRemark;
		this.bySubscription = movie.bySubscription;
		this.createdAt = new Date(movie.createdAt);

		if (movie.countries) {
			this.countries = movie.countries;
		}
		if (movie.poster) {
			this.poster = movie.poster;
		}
		if (movie.description) {
			this.description = movie.description;
		}
		if (movie.imdb) {
			this.imdb = movie.imdb;
		}
		if (movie.rating) {
			this.rating = movie.rating;
		}
		if (movie.genres) {
			this.genres = movie.genres;
		}
		if (movie.actors) {
			this.actors = movie.actors;
		}
		if (movie.comments) {
			this.comments = movie.comments;
		}
		if (movie.categories) {
			this.categories = movie.categories;
		}
		if (movie.treiler) {
			this.treiler = movie.treiler;
		}
		if (movie.file) {
			this.file = movie.file;
		}
		if (movie.seasons) {
			this.seasons = movie.seasons;
		}
		if (movie.producers) {
			this.producers = movie.producers;
		}
	}

	get countriesTitle() {
		return this.countries?.map((c) => c.title);
	}

	get categoriesTitle() {
		return this.categories?.map((c) => c.title);
	}
}

export interface IMovieFile {
	id: number;
	movie?: MovieModel;
	cd?: IFile;
	hd?: IFile;
	fullHD?: IFile;
	uHD?: IFile;
	createdAt: string;
}

export interface IProducer {
	id: number;
	avatar: IFile;
	name: string;
	slug: string;
	movie?: MovieModel[];
	createdAt: string;
}

export interface ISeason {
	id: number;
	season: number;
	movie?: MovieModel;
	episodes: IEpisode[];
	createdAt: string;
}

export interface IEpisode {
	id: number;
	episode: number;
	season?: ISeason;
	file: IFile;
	createdAt: string;
}

export interface IUser {
	id: number;
	name: string;
	parent?: IUser;
	subUsers?: IUser[];
	contact?: IContact;
	role?: IRole;
	balance?: number;
	ageRemark?: number;
}

export interface IContact {
	email: string;
}

export interface IFile {
	id: number;
	name: string;
	url: string;
}
