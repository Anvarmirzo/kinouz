import {FileModel} from './global';
import {MovieModel} from './movie';

export class DirectorModel {
	id: number;
	name: string;
	slug: string;
	avatar?: FileModel;
	createdAt?: Date;
	movie?: MovieModel[];

	constructor(director: DirectorModel) {
		this.id = director.id;
		this.name = director.name;
		this.slug = director.slug;

		if (director.avatar) {
			this.avatar = new FileModel(director.avatar);
		}

		if (director.createdAt) {
			this.createdAt = new Date(director.createdAt);
		}

		if (director.movie) {
			this.movie = director.movie.map((m) => new MovieModel(m));
		}
	}
}
