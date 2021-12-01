# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

puts "Destroying everything..."
User.destroy_all 

puts "Creating user(s)..."
User.create([
    {
        display_name: "Pablo Sanchez",
        email: "nerf_this@hotmail.com",
        spotify_id: "123456789",
        uri: "URI1234"
    },
    {
        display_name: "Pete Wheeler",
        email: "absoluteLegend2@earthlink.net",
        spotify_id: "223456449",
        uri: "URI3456"
    },
    {
        display_name: "Kiesha Phillips",
        email: "GOATed4dayz@aol.com",
        spotify_id: "075259549",
        uri: "URI6789"
    },

])