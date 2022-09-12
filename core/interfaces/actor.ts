import {MovieModel} from './movie';
import {FileModel} from './global';

export class ActorModel {
	id: number;
	avatar: FileModel;
	name: string;
	slug: string;
	movies?: MovieModel[];
	createdAt: Date;

	constructor(actor: ActorModel) {
		this.id = actor.id;
		this.name = actor.name;
		this.slug = actor.slug;
		this.createdAt = new Date(actor.createdAt);
		this.avatar = actor.avatar ?? {id: 0, url: '/img/placeholder/user.png', name: 'Anonymous'};

		if (actor.movies) {
			this.movies = actor.movies;
		}
	}
}
