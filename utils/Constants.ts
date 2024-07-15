import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const TEXT_LARGE = hp(2.5);
export const TEXT_PRIMARY = hp(2);
export const TEXT_SECONDARY = hp(1.8);

export const FONT_REGULAR = 'Regular';
export const FONT_MEDIUM = 'Medium';
export const FONT_SEMI_BOLD = 'SemiBold';
export const FONT_BOLD = 'Bold';

export const COLOR_PRIMARY_900 = '#F4A905';
export const COLOR_PRIMARY_600 = '#F8C71E';
export const COLOR_PRIMARY_400 = '#F6BD16';
export const COLOR_PRIMARY_200 = '#F5B30D';
export const COLOR_SECONDARY_600 = '#FADA2F';
export const COLOR_SECONDARY_400 = '#F9D026';
export const COLOR_SECONDARY_200 = '#FBE437';
export const COLOR_SECONDARY_LIGHTER = '#FFFCE8';
export const COLOR_GRAY = '#EDEDED';

export const API_URL = 'https://petopia-4mv2.onrender.com';

export interface IUser {
	status: string;
	name: string;
	email: string;
	role: string;
	avatar: string;
	background: string;
	address: string;
}

export interface IUserProfile {
	id: number;
	name: string;
	gender: string;
	address: string;
	role: string;
	phone: string;
	images: string[];
	groups: Object[];
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

export interface IService {
	id: number;
	serviceName: string;
	rating: number;
	servicePrice: number;
}

export interface IServiceCenter {
	id: number;
	name: string;
	address: string;
	rating: number;
}

export interface ICenterDetail {
	name: string;
	address: string;
	phone: string;
	website: string;
	description: string;
	imgLink: string;
}

export interface ICenterServiceDetail {
	id: number;
	name: string;
	price: number;
	type: string;
	onSite: boolean;
}

export interface ITimeSlot {
	id: number;
	name: string;
	startTime: string;
	endTime: string;
	status: string;
}
