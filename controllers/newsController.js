const Twitter = require('twitter')

const newsView = async (req, res) => {
    const client = new Twitter({
        consumer_key: process.env.TWITTER_API_KEY,
        consumer_secret: process.env.TWITTER_API_KEY_SECRET,
        access_token_key: process.env.TWITTER_API_ACCESS_TOKEN,
        access_token_secret: process.env.TWITTER_API_ACCESS_TOKEN_SECRET
    });

    const news = await client.get('statuses/user_timeline', {
        screen_name: "NewBeauty"
    });
    const userData = await client.get('users/show.json', {
        screen_name: "NewBeauty"
    })
    res.render('news', {
        userData: userData,
        newsData: news,
        pageName: "news"
    })
}

module.exports = { newsView }