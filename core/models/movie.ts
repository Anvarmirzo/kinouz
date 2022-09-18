import {FileModel} from './global';
import {ActorModel} from './actor';
import {CommentModel} from './comment';

export enum eMovieQuality {
	CD = 'cd',
	HD = 'hd',
	fullHD = 'fullHD',
	uHD = 'uHD',
}

export class CategoryModel {
	id: number;
	title: string;
	slug: string;
	movies?: MovieModel[];

	constructor(category: CategoryModel) {
		this.id = category.id;
		this.title = category.title;
		this.slug = category.slug;

		if (category.movies) {
			this.movies = category.movies.map((m) => new MovieModel(m));
		}
	}
}

export class MovieFileModel {
	id: number;
	movie?: MovieModel;
	cd?: FileModel;
	hd?: FileModel;
	fullHD?: FileModel;
	uHD?: FileModel;
	createdAt: Date;

	constructor(file: MovieFileModel) {
		this.id = file.id;
		this.createdAt = new Date(file.createdAt);

		if (file.cd) {
			this.cd = new FileModel(file.cd);
		}

		if (file.movie) {
			this.movie = new MovieModel(file.movie);
		}

		if (file.hd) {
			this.hd = new FileModel(file.hd);
		}

		if (file.fullHD) {
			this.fullHD = new FileModel(file.fullHD);
		}

		if (file.uHD) {
			this.uHD = file.uHD;
		}
	}

	get qualitiesList() {
		return [
			...(this.cd ? [{file: this.cd, quality: eMovieQuality.CD}] : []),
			...(this.hd ? [{file: this.hd, quality: eMovieQuality.HD}] : []),
			...(this.fullHD ? [{file: this.fullHD, quality: eMovieQuality.fullHD}] : []),
			...(this.uHD ? [{file: this.uHD, quality: eMovieQuality.uHD}] : []),
		];
	}
}

export class GenreModel {
	id: number;
	title: string;
	slug: string;
	movie?: MovieModel[];
	createdAt: Date;

	constructor(genre: GenreModel) {
		this.id = genre.id;
		this.title = genre.title;
		this.slug = genre.slug;
		this.createdAt = new Date(genre.createdAt);

		if (genre.movie) {
			this.movie = genre.movie.map((m) => new MovieModel(m));
		}
	}
}

export class EpisodeModel {
	id: number;
	episode: number;
	file: FileModel;
	createdAt: Date;
	season?: SeasonModel;

	constructor(episode: EpisodeModel) {
		this.id = episode.id;
		this.episode = episode.episode;
		this.file = new FileModel(episode.file);
		this.createdAt = new Date(episode.createdAt);

		if (episode.season) {
			this.season = new SeasonModel(episode.season);
		}
	}
}

export class SeasonModel {
	id: number;
	season: number;
	episodes: EpisodeModel[];
	createdAt: Date;
	movie?: MovieModel;

	constructor(season: SeasonModel) {
		this.id = season.id;
		this.season = season.season;
		this.createdAt = new Date(season.createdAt);
		this.episodes = season.episodes.map((e) => new EpisodeModel(e));
	}
}

export class ProducerModel {
	id: number;
	avatar: FileModel;
	name: string;
	slug: string;
	createdAt: Date;
	movie?: MovieModel[];

	constructor(producer: ProducerModel) {
		this.id = producer.id;
		this.name = producer.name;
		this.slug = producer.slug;
		this.createdAt = new Date(producer.createdAt);
		this.avatar = producer.avatar
			? new FileModel(producer.avatar)
			: {
					id: 0,
					url: '/img/placeholder/user.png',
					name: 'Anonymous',
			  };
	}
}

export class CountryModel {
	id: number;
	title: string;
	slug: string;
	createdAt: Date;
	movie?: MovieModel[];

	constructor(country: CountryModel) {
		this.id = country.id;
		this.title = country.title;
		this.slug = country.slug;
		this.createdAt = new Date(country.createdAt);

		if (country.movie) {
			this.movie = country.movie.map((m) => new MovieModel(m));
		}
	}
}

export class MovieModel {
	createdAt: Date;
	id: number;
	title: string;
	slug: string;
	year: number;
	isNew: boolean;
	isSerial: boolean;
	bySubscription: boolean;
	poster?: FileModel;
	description?: string;
	imdb?: number;
	rating?: number;
	ageRemark: number;
	genres?: GenreModel[];
	countries?: CountryModel[];
	actors?: ActorModel[];
	acters?: ActorModel[];
	comments?: CommentModel[];
	categories?: CategoryModel[];
	producers?: ProducerModel[];
	seasons?: SeasonModel[];
	treiler?: FileModel;
	trailer?: FileModel;
	file?: MovieFileModel;

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
			this.file = new MovieFileModel(movie.file);
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
