declare global {
  interface IUser {
    id : number
    username : string
    email : string
    password : string
    friends? : IUser[]
  }
  interface IUserRequestsProps {
    friendId? : IUser['id']
    newUsername?: IUser['username']
    email?: IUser['email']
    password? : IUser['password']
    userId?: IUser['id']
    friends? : IUser['friends']
    friend? : IUser

  }
}

export {}
