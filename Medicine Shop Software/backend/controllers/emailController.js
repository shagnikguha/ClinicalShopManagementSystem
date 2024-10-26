import nodemailer from 'nodemailer';

// Create test account for development purposes
async function createTransporter() {
    // Create a test account on Ethereal
    const testAccount = await nodemailer.createTestAccount();
    
    // Create reusable transporter object using the test account
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "tania.spinka@ethereal.email", // generated ethereal user
            pass: "	ghWV3K99eHMUmRYmXq", // generated ethereal password
        },
    });
    
    return transporter;
}

export default await createTransporter();