var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const ImageSchema = new Schema({
      name : String,
      image: {
        data: {
            type: Buffer
        },
        contentType: {
            type: String
        }
    }
    });

Image = mongoose.model('Image', BookingSchema);
module.exports = Image;