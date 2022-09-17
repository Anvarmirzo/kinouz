export interface IRole {
	id: number;
	title: string;
}

export interface IContact {
	email: string;
}

export interface ICreateUser {
	name: string;
	email: string;
	userId: number;
	ageRemark?: number;
	password: string;
}

export class UserModel {
	id: number;
	name: string;
	contact: IContact;
	role?: IRole;
	balance: number;
	ageRemark?: number;
	parent?: UserModel;
	subUsers?: UserModel[];

	constructor(user: UserModel) {
		this.id = user.id;
		this.name = user.name;
		this.balance = user.balance;
		this.contact = user.contact;

		if (user.ageRemark) {
			this.ageRemark = user.ageRemark;
		}

		if (user.parent) {
			this.parent = user.parent;
		}

		if (user.role) {
			this.role = user.role;
		}

		if (user.subUsers) {
			this.subUsers = user.subUsers.map((u) => new UserModel(u));
		}
	}
}
