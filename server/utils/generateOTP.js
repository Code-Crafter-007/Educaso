export function generateOTP(length = 4) {

    const min = 1000;
    const max = 9000;

    return String(Math.floor(Math.random() * max) + min);
}