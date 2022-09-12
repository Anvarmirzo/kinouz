import {
	ICategory,
	IComment,
	ICountry,
	FileModel,
	IGenre,
	IMovieFile,
	IProducer,
	ISeason,
} from './global';
import {ActorModel} from './actor';

export class MovieModel {
	createdAt: Date;
	id: number;
	title: string;
	slug: string;
	poster?: FileModel;
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
	actors?: ActorModel[];
	acters?: ActorModel[];
	comments?: IComment[];
	categories?: ICategory[];
	producers?: IProducer[];
	seasons?: ISeason[];
	treiler?: FileModel;
	trailer?: FileModel;
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
			this.poster = new FileModel(movie.poster);
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
		if (movie.acters) {
			this.actors = movie.acters.map((a) => new ActorModel(a));
		}
		if (movie.comments) {
			this.comments = movie.comments;
		}
		if (movie.categories) {
			this.categories = movie.categories;
		}
		if (movie.treiler) {
			this.trailer = new FileModel(movie.treiler);
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
