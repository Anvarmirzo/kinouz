interface IRole {
	id: number;
	title: string;
}

interface IContact {
	email: string;
}

export interface ICreateUser {
	name: string;
	email: string;
	userId: number;
	password: string;
	ageRemark?: number;
}

export interface IPatchUser extends Omit<Partial<ICreateUser>, 'userId'> {
	userId: number;
}

class SubscriptionModel {
	id: number;
	type: any;
	active: boolean;
	expirationAt: Date;
	user?: UserModel;

	constructor(subscription: SubscriptionModel) {
		this.id = subscription.id;
		this.type = subscription.type;
		this.active = subscription.active;
		this.expirationAt = new Date(subscription.expirationAt);

		if (subscription.user) {
			this.user = new UserModel(subscription.user);
		}
	}
}

export class UserModel {
	id: number;
	name: string;
	contact: IContact;
	balance: number;
	subUsers: UserModel[] = [];
	subscriptions: SubscriptionModel[] = [];
	role?: IRole;
	parent?: UserModel;
	ageRemark?: number;

	constructor(user: UserModel) {
		this.id = user.id;
		this.name = user.name;
		this.balance = user.balance;
		this.contact = user.contact;
		this.subscriptions = user.subscriptions.map((s) => new SubscriptionModel(s));

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
