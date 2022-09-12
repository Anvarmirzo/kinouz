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
