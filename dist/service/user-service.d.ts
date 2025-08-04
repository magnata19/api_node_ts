type UserDto = {
    name: string;
    surname: string;
    email: string;
    password: string;
};
export default class UserService {
    createUser(data: UserDto): Promise<{
        message: string;
    }>;
}
export {};
//# sourceMappingURL=user-service.d.ts.map