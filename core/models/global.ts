export class FileModel {
	id: number;
	name: string;
	url: string;

	constructor(file: FileModel) {
		this.id = file.id;
		this.name = file.name;
		this.url = file.url;
	}
}

export interface IAutoCompleteParams {
	index?:
		| 'year'
		| 'genres'
		| 'acters'
		| 'countries'
		| 'categories'
		| 'producers'
		| 'directors'
		| 'movies';
	search?: string;
	// filter: ["year=2001", "genres=1,2,3", "acters=23,2", countries="2,3,5"]
	filter?: string[];
	limit?: number;
	offset?: number;
}

export interface IAutoComplete {
	hits: {
		id: number;
		title?: string;
		name?: string;
		slug: string;
	}[];
	count: number;
	query: string;
}
