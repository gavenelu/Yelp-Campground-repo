const mongoose = require('mongoose');
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');


mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    // useNewUrlParser: true,
    // // useCreateIndex: true,
    // useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

// const seedDB = async () => {
//     await Campground.deleteMany({});
//     const c = new Campground({ title: 'purple field' });
//     await c.save();
// }

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            //your user ID
            author: '626284f51e1b2acc660eba58',
            location: `${cities[random1000].city}, ${cities[random1000].state} `,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae eaque, corrupti eos quis explicabo animi iste repellat inventore necessitatibus vero tenetur nisi, culpa, ipsum dolores praesentium commodi. In, rem omnis!',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/dmg7kptm5/image/upload/v1651909001/YelpCamp/af969ib0byrjxevlizsb.jpg',
                  filename: 'YelpCamp/af969ib0byrjxevlizsb',
                },
                {
                  url: 'https://res.cloudinary.com/dmg7kptm5/image/upload/v1651909004/YelpCamp/qqedxurm0nrq8sz7rvcc.jpg',
                  filename: 'YelpCamp/qqedxurm0nrq8sz7rvcc',
                }
              ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})