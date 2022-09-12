import {ReactElement} from 'react';
import {MovieModel} from './movie';

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

export interface IMovieFile {
	id: number;
	movie?: MovieModel;
	cd?: FileModel;
	hd?: FileModel;
	fullHD?: FileModel;
	uHD?: FileModel;
	createdAt: string;
}

export interface IProducer {
	id: number;
	avatar: FileModel;
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
	file: FileModel;
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

export class FileModel {
	id: number;
	name: string;
	url: string;

	constructor(file: FileModel) {
		this.id = file.id;
		this.name = file.name;
		this.url = `${process.env.NEXT_PUBLIC_API_URL}${file.url}`;
	}
}
