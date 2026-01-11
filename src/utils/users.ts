export type AppUserRole = 'landLord' | 'student';

export interface AppUser {
    type: AppUserRole,
    name: string,
    profilePicture: string,
    email: string,
    phone: string,
    description: string
}