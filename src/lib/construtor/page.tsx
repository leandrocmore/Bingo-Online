
import User from "@/app/api/users/models/User";

const users: User[] = [
  new User("1","leandro","user@user.com","123","admin"),
  new User("2","leuroi","leuroi@leuroi.com","123","user"),
];

 const findUserByEmail = (email: string): User | undefined => {
  return users.find(user => user.email === email);
};

 const addUser = (user: User): void => {
  users.push(user);
};
export { findUserByEmail,addUser,users };