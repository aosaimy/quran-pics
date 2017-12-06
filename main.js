#!/usr/bin/env node

var gm = require('gm') //.subClass({imageMagick: true})
var ayat = require('./ayat.json')

function paddy(n, p, c) {
    "use strict";
    var pad_char = typeof c !== 'undefined' ? c : '0';
    var pad = new Array(1 + p).join(pad_char);
    return (pad + n).slice(-pad.length);
}
class QuranicImageCreater {
    constructor(argv) {
        this.symbols = ['\uFB51', '\uFB52', '\uFB53', '\uFB54', '\uFB55', '\uFB56', '\uFB57', '\uFB58', '\uFB59', '\uFB5A', '\uFB5B', '\uFB5C', '\uFB5D', '\uFB5E', '\uFB5F', '\uFB60', '\uFB61', '\uFB62', '\uFB63', '\uFB64', '\uFB65', '\uFB66', '\uFB67', '\uFB68', '\uFB69', '\uFB6A', '\uFB6B', '\uFB6C', '\uFB6D', '\uFB6E', '\uFB6F', '\uFB70', '\uFB71', '\uFB72', '\uFB73', '\uFB74', '\uFB75', '\uFB76', '\uFB77', '\uFB78', '\uFB79', '\uFB7A', '\uFB7B', '\uFB7C', '\uFB7D', '\uFB7E', '\uFB7F', '\uFB80', '\uFB81', '\uFB82', '\uFB83', '\uFB84', '\uFB85', '\uFB86', '\uFB87', '\uFB88', '\uFB89', '\uFB8A', '\uFB8B', '\uFB8C', '\uFB8D', '\uFB8E', '\uFB8F', '\uFB90', '\uFB91', '\uFB92', '\uFB93', '\uFB94', '\uFB95', '\uFB96', '\uFB97', '\uFB98', '\uFB99', '\uFB9A', '\uFB9B', '\uFB9C', '\uFB9D', '\uFB9E', '\uFB9F', '\uFBA0', '\uFBA1', '\uFBA2', '\uFBA3', '\uFBA4', '\uFBA5', '\uFBA6', '\uFBA7', '\uFBA8', '\uFBA9', '\uFBAA', '\uFBAB', '\uFBAC', '\uFBAD', '\uFBAE', '\uFBAF', '\uFBB0', '\uFBB1', '\uFBD3', '\uFBD4', '\uFBD5', '\uFBD6', '\uFBD7', '\uFBD8', '\uFBD9', '\uFBDA', '\uFBDB', '\uFBDC', '\uFBDD', '\uFBDE', '\uFBDF', '\uFBE0', '\uFBE1', '\uFBE2', '\uFBE3', '\uFBE4', '\uFBE5', '\uFBE6', '\uFBE7', '\uFBE8', '\uFBE9', '\uFBEA', '\uFBEB', '\uFBEC', '\uFBED', '\uFBEE', '\uFBEF', '\uFBF0', '\uFBF1', '\uFBF2', '\uFBF3', '\uFBF4', '\uFBF5', '\uFBF6', '\uFBF7', '\uFBF8', '\uFBF9', '\uFBFA', '\uFBFB', '\uFBFC', '\uFBFD', '\uFBFE', '\uFBFF', '\uFC00', '\uFC01', '\uFC02', '\uFC03', '\uFC04', '\uFC05', '\uFC06', '\uFC07', '\uFC08', '\uFC09', '\uFC0A', '\uFC0B', '\uFC0C', '\uFC0D', '\uFC0E', '\uFC0F', '\uFC10', '\uFC11', '\uFC12', '\uFC13', '\uFC14', '\uFC15', '\uFC16', '\uFC17', '\uFC18', '\uFC19', '\uFC1A', '\uFC1B', '\uFC1C', '\uFC1D', '\uFC1E', '\uFC1F', '\uFC20', '\uFC21', '\uFC22', '\uFC23', '\uFC24', '\uFC25', '\uFC26', '\uFC27', '\uFC28', '\uFC29', '\uFC2A', '\uFC2B', '\uFC2C', '\uFC2D', '\uFC2E', '\uFC2F', '\uFC30', '\uFC31', '\uFC32', '\uFC33', '\uFC34', '\uFC35', '\uFC36', '\uFC37', '\uFC38', '\uFC39', '\uFC3A', '\uFC3B', '\uFC3C', '\uFC3D', '\uFC3E', '\uFC3F', '\uFC40', '\uFC41', '\uFC42', '\uFC43', '\uFC44', '\uFC45', '\uFC46', '\uFC47', '\uFC48', '\uFC49', '\uFC4A', '\uFC4B', '\uFC4C', '\uFC4D', '\uFC4E', '\uFC4F', '\uFC50', '\uFC51', '\uFC52', '\uFC53', '\uFC54', '\uFC55', '\uFC56', '\uFC57', '\uFC58', '\uFC59', '\uFC5A', '\uFC5B', '\uFC5C', '\uFC5D', '\uFC5E', '\uFC5F', '\uFC60', '\uFC61', '\uFC62', '\uFC63', '\uFC64', '\uFC65', '\uFC66', '\uFC67', '\uFC68', '\uFC69', '\uFC6A', '\uFC6B', '\uFC6C', '\uFC6D', '\uFC6E', '\uFC6F', '\uFC70', '\uFC71', '\uFC72', '\uFC73', '\uFC74', '\uFC75', '\uFC76', '\uFC77', '\uFC78', '\uFC79'];
        this.font_size = argv.size
        this.verbose = argv.verbose
        this.format = argv.format
        this.color = argv.color
        // this.ayah_id = -1
        this.ayah = null
        this.page = -1
        this.width = 100
        this.counter = 0
        this.done = 0
        this.onDone = () => {
            if(this.verbose)
                console.error("onDone");
            if (argv.o)
                this.getPic().saveToFile(argv.o)
            else
                this.getPic().getStream().pipe(process.stdout)

        }
        // this.data = gm(100000, 800, "transparent")
    }
    setAyah(sorah, ayah) {
        var ayah_id = ayat.findIndex(x => {
            return ayah == x.ayahNo && sorah == x.sorahNo;
        })
        if (this.verbose)
            console.error(ayah_id);
        if (ayah_id < 0) {
            throw new Error("No ayah was found!");
        }
        this.ayah = ayat[ayah_id]
        this.page = paddy(this.ayah.page, 3);
    }
    searchAyah(regex,n) {
        if (this.verbose)
            console.error("regex",regex);
        var results = ayat.filter(x => {
            // console.error(x.string);
            return regex.test(x.string);
        })
        // if (this.verbose)
        //     console.error(results);
        if (results.length === 0) {
            throw new Error("No ayah was found!");
        }
        else if(this.verbose)
            console.error("Found:",results.length,"ayat.")
        n = n-1 < results.length ? n -1  : 0
        this.ayah = results[n]
        this.page = paddy(this.ayah.page, 3);
    }
    getEncodedText(from, to) {
        "use strict";
        var text = "";
        for (var i = from; i <= to; i++) {
            text = this.getSymbol(i) + text;
        }
        this.text = text
        return this.text
    }
    setEncodedText(text) {
        "use strict";
        this.text = text
        return this
    }
    getSymbol(order) {
        return this.symbols[order];
    }
    gmToBuffer(data) {
        return new Promise((resolve, reject) => {
            data.stream((err, stdout, stderr) => {
                if (err) {
                    return reject(err)
                }
                const chunks = []
                stdout.on('data', (chunk) => {
                    chunks.push(chunk)
                })
                // these are 'once' because they can and do fire multiple times for multiple errors,
                // but this is a promise so you'll have to deal with them one at a time
                stdout.once('end', () => {
                    resolve(Buffer.concat(chunks))
                })
                stderr.once('data', (data) => {
                    reject(String(data))
                })
            })
        })
    }
    getStream() {
        return this.data.stream()
    }

    getPic() {
        var first = gm("tmp" + (this.counter - 1) + ".png")
        for (var i = this.counter - 2; i >= 0; i--) {
            first = first.append("tmp" + i + ".png", true)
        }
        this.data = first.trim()
            .setFormat(this.format)
        // this.data = this.data.trim().resize(null, this.font_size)
        //     .setFormat("PNG")
        return this
    }
    drawText(from, to) {
        var text = this.getEncodedText(from, to)

        var counter = this.counter
        var that = this
        gm(2000 * text.length, 800, "transparent")
            .fill(this.color)
            .font("./fonts/QCF_P" + this.page + ".TTF", 300)
            .fontSize(300)
            .drawText(this.width, 10, text, "Center")
            .trim()
            .resize(null, this.font_size)
            .write("tmp" + this.counter + ".png", err => {
                if (err)
                    throw err
                if (this.verbose)
                    console.error("done writing: tmp" + counter + ".png")
                that.done--
                    if (that.done === 0)
                        that.onDone()
            })
        this.counter++;
        return this
    }
    // drawText(from, to) {
    //     var text = this.getEncodedText(from, to)

    //     console.error(text,this.width,text.length);
    //     this.data = this.data
    //         .fill('#FFFFFF')
    //         .font("./fonts/QCF_P" + this.page + ".TTF", 300)
    //         .drawText(this.width, 300, text, "NorthEast")
    //     this.width = this.width + 2000 * text.length
    //     console.error(this.width);
    //     return this
    // }
    saveToFile(path) {
        this.data.write(path, function(err) { //err, stdout, stderr, command){
            if (this.verbose)
                console.error("done", err);
            // if(err){ next(err) }
            // else { next(null, raft) };
        });
        return this
    }
    getBuffer(callback) {
        this.gmToBuffer(this.data).then(function(buffer) {
                let dataPrefix = `data:image/png;base64,`
                let data = dataPrefix + buffer.toString('base64')
                return callback(null, data)
            })
            .catch(function(err) {
                return callback(err)
            })
        return this
    }
}

if (require.main === module) { // called directly
    require('yargs')
        .command('ayah [id]', 'produce ayah picture', (yargs) => {
            "use strict";
            yargs.positional('id', {
                desc: 'ayah id in the form 2:13',
                default: "1:1"
            })
        }, (argv) => {
            "use strict";
            var qic = new QuranicImageCreater(argv);
            var sorah = argv.id.split(":")[0]
            var ayah = argv.id.split(":")[1]
            qic.setAyah(sorah, ayah);
            qic.done = 1
            qic.drawText(qic.ayah.order, qic.ayah.order + qic.ayah.wordsCount - 1)
        })
        .command('ayat', 'produce multiple ayah in one picture', (yargs) => {
            "use strict";
            return yargs.options({
                'ids': {
                    array: true,
                    desc: "list of ayat in format sorah:ayah e.g. 3:4",
                    required: true
                }
            })
        }, (argv) => {
            "use strict";
            if (this.verbose)
                console.error("argv:",argv);
            var qic = new QuranicImageCreater(argv);
            var allByPage = {}
            qic.done = argv.ids.length
            argv.ids.forEach(x => {
                var sorah = x.split(":")[0]
                var ayah = x.split(":")[1]
                qic.setAyah(sorah, ayah)
                allByPage[qic.page] = allByPage[qic.page] || []
                allByPage[qic.page].push(x)
                qic.drawText(qic.ayah.order, qic.ayah.order + qic.ayah.wordsCount - 1)
            })
        })
        .command('search', 'search for an ayah', (yargs) => {
            "use strict";
            return yargs.options({
                'whole': {
                    alias: "w",
                    desc: "only match whole word",
                    type: "boolean"
                }
            })
        }, (argv) => {
            "use strict";
            if (this.verbose)
                console.error("argv:",argv);
            var qic = new QuranicImageCreater(argv);
            try{
            if(argv.regex)
                qic.searchAyah(new RegExp(argv.regex),argv.n)
            else if(argv.w)
                qic.searchAyah(new RegExp("(\\s|^)"+argv._.slice(1).join(" ")+"(\\s|$)"),argv.n)
            else
                qic.searchAyah(new RegExp(argv._.slice(1).join(" ")),argv.n)
            qic.done = 1
            qic.drawText(qic.ayah.order, qic.ayah.order + qic.ayah.wordsCount - 1)
            }catch(e){
                console.error(e.message)
            }
        })
        .option('out', {
            alias: 'o',
            desc: "if set, image will be saved to the given path, otherwise it will be outputted to standard output"
        })
        .option('verbose', {
            alias: 'v',
            desc: 'print more details',
            default: false
        })
        .option('size', {
            alias: 's',
            desc: 'the height of the output picture in pixels',
            default: 200
        })
        .option('format', {
            alias: 'f',
            desc: "the format of the picture.",
            default: "PNG"
        })
        .option('color', {
            alias: 'c',
            desc: "the color of the text.",
            default: "#000000"
        })
        .argv

} else {
    module.exports = (argv) => {
        "use strict";
        return new QuranicImageCreater(argv)
    }
}