const captainModel = require('../models/captain.module');




module.exports.createCaptain = async ({
    firstname, lastname, email, password,
    color, plate, capacity, vehicleType
}) => {

    if (!firstname || !email || !password || !color || !plate || !capacity || !vehicleType) {
        throw new Error('All fields are required');
    }

    const hashPassword = await captainModel.hashPassword(password);

    const captain = await captainModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password: hashPassword,
        vehicle: {
            color,
            plate,
            capacity,
            vehicleType
        }
    });

    return captain;
}
