interface user{
    name: string,
    email: string,
    password: string,
    institution: string,
    phone: string,
    dateOfRegistration: Date,
    profilePicture: File,
    rating: number,
}

export default user;