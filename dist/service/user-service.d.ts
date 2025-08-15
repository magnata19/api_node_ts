type UserDto = {
    name: string;
    surname: string;
    email: string;
    password: string;
    roleId: string;
};
export default class UserService {
    createUser(data: UserDto): Promise<{
        message: string;
    }>;
    getUsers(): Promise<any[]>;
}
export {};
//# sourceMappingURL=user-service.d.ts.map