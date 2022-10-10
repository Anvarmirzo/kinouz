export enum ePaymentType {
	Click = 1,
	PayMe = 2,
}

export enum ePaymentStatusType {
	Pending = 1,
	Success = 2,
	Fail = 3,
}

export interface IPostPayment {
	typeId: ePaymentType;
	userId: number;
	summa: number;
	statusId?: ePaymentStatusType;
}

export class PaymentModel {
	id: number;
	type: {
		id: ePaymentType;
		title: keyof typeof ePaymentType;
	};
	status: {
		id: ePaymentStatusType;
		title: string;
	};
	user: {
		id: number;
		name: string;
	};
	summa: number;
	createdAt: Date;

	constructor(payment: PaymentModel) {
		this.id = payment.id;
		this.type = payment.type;
		this.status = payment.status;
		this.user = payment.user;
		this.summa = payment.summa;
		this.createdAt = new Date(payment.createdAt);
	}
}
