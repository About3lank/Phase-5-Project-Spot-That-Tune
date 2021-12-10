puts "Destroying everything..."
    User.destroy_all 
    Playlist.destroy_all
    Game.destroy_all
    Token.destroy_all
    Song.destroy_all

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
null_playlist = Playlist.create({
    name: "",
    description: "",
    tracks: "",
    imageUrl: "",
    uri: "null_playlist"
})
Playlist.create([
    {
        name: "Emo Forever",
        description: "All the standard emo anthems. Cover: Gerard Way",
        tracks: "https://api.spotify.com/v1/playlists/37i9dQZF1DX9wa6XirBPv8/tracks",
        imageUrl: "https://i.scdn.co/image/ab67706f000000037c6fd6e38de56e19e85379b7",
        uri: "spotify:playlist:37i9dQZF1DX9wa6XirBPv8"
    },
    {name: '90s Hits', description: 'As if! Your favorite 1990s throwbacks, including “…”, “Bye Bye Bye”, “…Baby One More Time” and more.', tracks: 'https://api.spotify.com/v1/playlists/3C64V048fGyQfCjmu9TIGA/tracks', uri: 'spotify:playlist:3C64V048fGyQfCjmu9TIGA', imageUrl: 'https://i.scdn.co/image/ab67706c0000bebbad3f7fc6ca71742df49cfd1f'},
    {
        name: 'Hot Country', 
        description: 'Love Music, help St. Jude stop cancer at musicgives.org. Cover: Kane Brown', 
        tracks: 'https://api.spotify.com/v1/playlists/37i9dQZF1DX1lVhptIYRda/tracks', 
        uri: 'spotify:playlist:37i9dQZF1DX1lVhptIYRda', 
        imageUrl: 'https://i.scdn.co/image/ab67706f000000036d71e5da6fcb24332a1709eb'
    },
    {name: "2000's Hip Hop", description: "The beats and ballers of the 2000's are all here. …aze up the biggest hits of Hip Hop! Cover: Miss E", tracks: 'https://api.spotify.com/v1/playlists/01pNIDYGqmeawppy32wr3D/tracks', uri: 'spotify:playlist:01pNIDYGqmeawppy32wr3D', imageUrl: 'https://i.scdn.co/image/ab67706c0000bebb92360834f587a800faecaee6'},
    {name: "Today's Top Hits", description: 'SZA is on top of the Hottest 50!', tracks: 'https://api.spotify.com/v1/playlists/37i9dQZF1DXcBWIGoYBM5M/tracks', uri: 'spotify:playlist:37i9dQZF1DXcBWIGoYBM5M', imageUrl: 'https://i.scdn.co/image/ab67706f00000003dc90e10f545c356398a4d904'},
    {name: 'Rock Classics', description: 'Rock legends & epic songs spanning decades, that continue to inspire generations. ', tracks: 'https://api.spotify.com/v1/playlists/37i9dQZF1DWXRqgorJj26U/tracks', uri: 'spotify:playlist:37i9dQZF1DWXRqgorJj26U', imageUrl: 'https://i.scdn.co/image/ab67706f00000003571c3e893c065ed5832b3a3e'},
    {name: '80s Hits', description: 'Nothing but unforgettable songs from the 80s.', tracks: 'https://api.spotify.com/v1/playlists/37i9dQZF1DXb57FjYWz00c/tracks', uri: 'spotify:playlist:37i9dQZF1DXb57FjYWz00c', imageUrl: 'https://i.scdn.co/image/ab67706f000000035e98bc8db32dc5981d0df665'},
    {name: "70s Hits", description: 'The best of what the 70s had to offer, from soft rock to pop, disco to classic rock', tracks: 'https://api.spotify.com/v1/playlists/00KjsgI9t715OJFEUFziGJ/tracks', uri: 'spotify:playlist:00KjsgI9t715OJFEUFziGJ', imageUrl: 'https://i.scdn.co/image/ab67706c0000bebbdc662c1acf1023a5413c6545'}
])

# puts "Creating games..."

puts "Done!!!"