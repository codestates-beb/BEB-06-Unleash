const fs = require('fs');
const path = require('path');

const configFileName = 'config.json';
const metadataDirName = 'metadata';

const metadataDir = path.resolve(__dirname, '..', metadataDirName);

function main() {
    const configFilePath = path.resolve(__dirname, '..', configFileName);
    const config = JSON.parse(fs.readFileSync(configFilePath, 'utf8'));
    metadataArray = [];
    const metadataDir = path.resolve(__dirname, '..', metadataDirName);

    createDirIfNotExists(metadataDir);

    for(i=0; i<=config.length; i++) {
        new Promise((resolve, reject) => {
            try {
                createMetadataFile(
                    {
                        token_id: `${config[i].token_id}`,
                        to: `${config[i].to}`,
                        from: `${config[i].from}`,
                        departuretime: `${config[i].departuretime}`,
                        arrivaltime: `${config[i].arrivaltime}`,
                        rating: `${config[i].rating}`
                    }, 
                i+1);
            } catch (err) {
                reject();
            }
            resolve();
        });
    };
}

function createMetadataFile(metadata, num) {
    // convert filename to padded hex string
    const paddedHexString = toPaddedHexString(num, 1);
    fs.writeFileSync(
        `${metadataDir}/${paddedHexString}.json`,
        JSON.stringify(metadata, null, 4),
        'utf8'
    );
}

function toPaddedHexString(num, len) {
    return num.toString(10).padStart(len, '0');
}

function createDirIfNotExists(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
}

main();
