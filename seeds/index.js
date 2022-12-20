const mongoose = require('mongoose');
const campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedhelpers')
const Campground = require('../models/campground')
const Review = require('../models/campground')

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
    await campground.deleteMany({});
    await Review.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '638e3bb33204b97e93552064',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nam velit quasi quae voluptate est odit, eveniet, distinctio sit cum dolorum nemo eligendi esse minus soluta ad excepturi consectetur beatae expedita.',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            image: [
                {
                    url: 'https://res.cloudinary.com/dojpa5ywq/image/upload/v1670793015/YelpCamp/l4smgo6xq6awnzg0knna.jpg',
                    filename: 'YelpCamp/l4smgo6xq6awnzg0knna'

                },
                {
                    url: 'https://res.cloudinary.com/dojpa5ywq/image/upload/v1670793015/YelpCamp/ycbxcahfwqdzaos1yr3f.jpg',
                    filename: 'YelpCamp/ycbxcahfwqdzaos1yr3f'

                }
            ],

        })
        await camp.save();
    }
}


seedDB().then(() => {
    mongoose.connection.close();
});