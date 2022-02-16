const jimp = require('jimp');
const lsb = require('lsb');
const fs = require('fs');
const express = require('express');
const app = express();
app.use(express.static('img'));

let arr = [];
let nbFile;
let text;

async function decode(inputImage) {
    const image = await jimp.read(inputImage);
    const json = lsb.decode(image.bitmap.data, rgb);
    return JSON.parse(json);
}

function rgb(n) {
    return n + Math.floor(n / 3);
}

async function countImgages() {
    const filename = fs.readdirSync('img');
    nbFile = filename.length;
    for (let i = 0; i < filename.length; i++)
    {
        const secret = await decode('img/'+filename[i]);
        arr.push({...secret,source: filename[i]});
    }
    arr.sort((a,b )=>a.index-b.index);

    const msg = arr.map(i=>i.message).join("")

    console.log(text);
    app.set('views', './views');
    app.set('view engine', 'pug');

    app.get('', (req, res) => {
        res.render('index', {images: arr, title:msg});
    });

}
countImgages()

app.listen(4000, function ()
{
    console.log('Server listening');
})
