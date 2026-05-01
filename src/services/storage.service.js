const {ImageKit} = require('@imagekit/nodejs');


const client = new ImageKit({
    publicKey : process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey : process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint : process.env.IMAGEKIT_URL_ENDPOINT
});


async function uploadFile(file, fileName) {
    try {
        const response = await client.files.upload({
            file,
            fileName: fileName + " _music_" + Date.now() || "music_" + Date.now(),
            folder: "/spotify-clone/musics",
        });
        return response;
    } catch (error) {
        throw new Error('File upload failed');
    }
}

module.exports = {
    uploadFile
};