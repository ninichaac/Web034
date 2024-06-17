const File = require('../models/file');
const fs = require('fs');
const csvParser = require('csv-parser');
const path = require('path');
const mongoose = require('mongoose');

const CSVData = mongoose.model('CSVData', new mongoose.Schema({
    original_name: String,
    "Event Receive Time": String,
    "Reporting IP": String,
    "Event Type": String,
    "Event Name": String,
    "Raw Event Log": String,
    
}));

module.exports.upload = async function (req, res) {
    try {
        File.uploadedFile(req, res, async function (err) {
            if (err) {
                console.log('multer error');
                return res.redirect('back');
            }
            if (req.file) {
                try {
                    const fileRecord = await File.create({
                        file_path: req.file.path
                    });

                    // Parse CSV file and insert data into MongoDB
                    const results = [];
                    fs.createReadStream(req.file.path)
                        .pipe(csvParser())
                        .on('data', (data) => results.push(data))
                        .on('end', async () => {
                            try {
                                await CSVData.insertMany(results.map(result => ({
                                    original_name: req.file.originalname,
                                    "Event Receive Time": result['Event Receive Time'],
                                    "Reporting IP": result['Reporting IP'],
                                    "Event Type": result['Event Type'],
                                    "Event Name": result['Event Name'],
                                    "Raw Event Log": result['Raw Event Log'],
                                })));
                                console.log('CSV data successfully inserted into MongoDB');
                                return res.redirect('back');
                            } catch (err) {
                                console.log('Error inserting CSV data into MongoDB', err);
                                return res.redirect('back');
                            }
                        });
                } catch (err) {
                    console.log('Error uploading file', err);
                    return res.redirect('back');
                }
            }
        });
    } catch (error) {
        console.log('Error display', error);
        return res.redirect('back');
    }
};

