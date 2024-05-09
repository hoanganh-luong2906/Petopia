export interface IUser {
	status: string;
	name: string;
	email: string;
	role: string;
	avatar: string;
}

export interface IUserProfile {
	id: number;
	name: string;
	email: string;
	avatarLink: string;
	status: string;
	appointmentList: IAppointment[];
	shop: {};
	role: string;
}

export interface IPet {
	id: number;
	name: string;
	gender: string;
	age: number;
	type: string;
	necklaceId: string;
	description: string;
	imgLinkList?: string[];
}

export interface IPetHealthHistory {
	petId: number;
	petName: string;
	petGender: string;
	petAge: number;
	petType: string;
	petNecklaceId?: string;
	petDescription: string;
	imgLinkList: string[];
	createdAt: string;
	updatedAt: string;
	appointments: IAppointment[];
}

export interface IAppointment {
	id: number;
	date: string;
	report: string;
	status: string;
	extra_content?: string;
	place?: string;
	doctor: IDoctor;
}

export interface IDoctor {
	id: number;
	name: string;
	avatarLink: string;
}

export const FONT_REGULAR = 'Regular';
export const FONT_MEDIUM = 'Medium';
export const FONT_SEMI_BOLD = 'SemiBold';
export const FONT_BOLD = 'Bold';

export interface ICustomPet {
	id: number;
	name: string;
	gender: string;
	age: number;
	type: string;
	necklaceId: string;
	description: string;
	imgLinkList: string[];
}
