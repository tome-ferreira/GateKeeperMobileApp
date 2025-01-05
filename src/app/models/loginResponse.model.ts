import { Building } from './building.model';

export interface LoginResponse {
    token : string;
    roles : string[];
}