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
        account_name: "Pablo Sanchez",
        display_name: "Pablo Sanchez",
        email: "nerf_this@hotmail.com",
        spotify_id: "123456789",
        uri: "URI1234"
    },
    {
        account_name: "Pete Wheeler",
        display_name: "Pete Wheeler",
        email: "absoluteLegend2@earthlink.net",
        spotify_id: "223456449",
        uri: "URI3456"
    },
    {
        account_name: "Kiesha Phillips",
        display_name: "Kiesha Phillips",
        email: "GOATed4dayz@aol.com",
        spotify_id: "075259549",
        uri: "URI6789"
    },

])

puts "Creating playlist(s)..."
Playlist.create([
    {
        name: "Emo Forever",
        description: "All the standard emo anthems. Cover: Gerard Way",
        tracks: "https://api.spotify.com/v1/playlists/37i9dQZF1DX9wa6XirBPv8/tracks",
        imageUrl: "https://i.scdn.co/image/ab67706f000000037c6fd6e38de56e19e85379b7",
        uri: "spotify:playlist:37i9dQZF1DX9wa6XirBPv8"
    }
])

puts "Done!!!"