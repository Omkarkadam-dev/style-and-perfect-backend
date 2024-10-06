import bcrypt from 'bcrypt'

const passwordHashing = async (password: string) => {
    try {
        return await bcrypt.hash(password, 10)
    }
     catch (error) {
        return 'unable to hash password'
    }
}

export {
    passwordHashing
}