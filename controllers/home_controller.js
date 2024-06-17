const File = require('../models/file');

module.exports.drop = async function (req,res){
    try {
        let files = await File.find({});
        return res.render('home', {
            files: files,
        });
    } catch {
        console.log('error fetching files')
    }
}