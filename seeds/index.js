const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers')
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp')

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected')
});

const sample = array => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: "62212262f35efbd0e29634a4",
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            geometry: {
              type:'Point',
              coordinates: [
                cities[random1000].longitude,
                cities[random1000].latitude
              ] 
            },
            images:  [
                {
                  url: 'https://res.cloudinary.com/de0mchrco/image/upload/v1646563539/YelpCamp/ceucvpt6jqzj1rbp31zz.jpg',
                  filename: 'YelpCamp/ceucvpt6jqzj1rbp31zz',
                },
                {
                  url: 'https://res.cloudinary.com/de0mchrco/image/upload/v1646563542/YelpCamp/gxx6ulmp3wvcxbb4oeve.jpg',
                  filename: 'YelpCamp/gxx6ulmp3wvcxbb4oeve',
                }
              ],
            description: ' Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi voluptas id veniam distinctio nam eum, deleniti, fugit sunt odit iste at praesentium? Qui ad inventore molestias magni obcaecati odit optio!',
            price
        })
        await camp.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close()
})
