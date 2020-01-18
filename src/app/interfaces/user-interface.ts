export interface UserInterface {
    uid ?:  string;
    nick: string;
    subnick ?: string;
    age ?: number;
    email: string;
    friend: boolean;
    status ?: string;
    avatar ?: string;
    friends ?: any;
}