import User from './User';

type GetUsersResponse = {
    auth: boolean,
    error: boolean,
    message: string,
    data: User;
};

export default GetUsersResponse;