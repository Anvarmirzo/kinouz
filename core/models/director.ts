export class DirectorModel {
	id: number;
	name: string;

	constructor(director: DirectorModel) {
		this.id = director.id;
		this.name = director.name;
	}
}
