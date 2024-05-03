export interface IUser {
	username: string;
	email: string;
	name: string;
	role: string;
	imageLink: string;
	backgroundImageLink: string;
	phone: string;
	gender: string;
	address: string;
}

export interface IPet {
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
