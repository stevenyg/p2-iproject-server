const sendAutoMailer = require('./helpers/nodemailer');
const axios = require('axios');

const scheduler = async (req, res) => {
    try {
        const response = await axios.get("https://uppsalafox21-coin.herokuapp.com/user/email")

        response.data.forEach(element => {

            const randomer = Math.floor(Math.random() * 5);
            let text = ""

            switch (randomer) {
                case 0:
                    text = `If you dont believe it or dont get it, I dont have the time to try to convince you, sorry. ~ Satoshi Nakamoto`
                    break;
                case 1:
                    text = `I see Bitcoin as ultimately becoming a reserve currency for banks, playing much the same role as gold did in the early days of banking. Banks could issue digital cash with greater anonymity and lighter weight, more efficient transactions. ~ Hal Finney`
                    break;
                case 2:
                    text = `Any time a country transitioned to a fiat currency, they collapsed. Thats just world history; you dont have to know about cryptocurrency to know that. ~ Nipsey Hussle`
                    break;
                case 3:
                    text = `If the cryptocurrency market overall or a digital asset is solving a problem, its going to drive some value. ~  Brad Garlinghouse`
                    break;
                case 4:
                    text = `We are seeing more managed money and, to an extent, institutional money entering the [crypto] space. Anecdotally speaking, I know of many people who are working at hedge funds or other investment managers who are trading cryptocurrency personally, the question is, when do people start doing it with their firms and funds? ~ Olaf Carlson-Wee`
                    break;
                default:
                    text = `Whenever the price of cryptocurrency is rallying, people start spending a lot more. ~  Erik Voorhees`
                    break;
            }
            sendAutoMailer(element.email, "Quotes of the day before you investing in Crypto", text)
        });
    } catch (error) {
        console.log(error);
    }
}

scheduler()





