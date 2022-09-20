import {MovieModel} from './movie';

export class CommentModel {
	id: number;
	user: {id: number; name: string};
	text: string;
	createdAt: Date;
	movie?: MovieModel;

	constructor(comment: CommentModel) {
		this.id = comment.id;
		this.user = comment.user;
		this.text = comment.text;
		this.createdAt = new Date(comment.createdAt);

		if (comment.movie) {
			this.movie = new MovieModel(comment.movie);
		}
	}
}
