const User = require('../model/user.model');
const UserCharacter = require('../model/user-characters.model');

async function isUserRegistered(userId) {
    const user = await User.findOne({ userId });
    return !!user;
}

async function registerUser(userId) {
    const exists = await User.findOne({ userId });
    if (exists) return false;
    const newUser = new User({ userId });
    await newUser.save();
    return true;
}

async function getUserList() {
    return await User.find({});
}

async function giveCharacterToUser(userId, characterId) {
    try {
        const newUserCharacter = new UserCharacter({
            userId: userId,
            characterId: characterId,
        });

        const savedCharacter = await newUserCharacter.save();

        console.log('Karakter başarıyla eklendi:', savedCharacter);
        return savedCharacter;

    } catch (error) {
        console.error('Karakter ekleme hatası:', error);
        throw error;
    }
}

module.exports = { isUserRegistered, registerUser, getUserList, giveCharacterToUser };