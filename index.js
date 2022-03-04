const fetch = require('node-fetch')
const cheerio = require('cheerio')
const axios = require("axios").default;
let { JSDOM } = require('jsdom')
const fetchHtml = async url => {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch {
    console.error(
      `ERROR: An error occurred while trying to fetch the URL: ${url}`
    );
  }
};
async function igstalk(username) {
    try {
        const URL = 'https://www.picuki.com/profile/' + username
        const res = await fetchHtml(URL)
		let $ = cheerio.load(res)
		let userName = $('body').find(".wrapper").find("div[class='profile-header'] > div[class='content clearfix'] > div[class='profile-info'] > div[class='profile-name'] > h1[class='profile-name-top']" ).text()
		let name = $('body').find(".wrapper").find("div[class='profile-header'] > div[class='content clearfix'] > div[class='profile-info'] > div[class='profile-name'] > h2[class='profile-name-bottom']" ).text()
        let usrProfile = $('body').find(".wrapper").find("div[class='profile-header'] > div[class='content clearfix'] > div[class='profile-info'] > div[class='profile-avatar']").find('img').attr('src');
		let { document } = (new JSDOM(res)).window
		let bio = document.querySelector("body > div.wrapper > div.profile-header > div > div.profile-description").innerHTML
		let foll = document.querySelector("body > div.wrapper > div:nth-child(2) > div > div.content-title > span:nth-child(3) > span").innerHTML
		let fllwd = document.querySelector("body > div.wrapper > div:nth-child(2) > div > div.content-title > span:nth-child(4) > span").innerHTML
		let pst = document.querySelector("body > div.wrapper > div:nth-child(2) > div > div.content-title > span.black-box > a > span").innerHTML
		const hasil = {
			Username: userName,
			name: name,
			bio: bio.trim(),
			userProfile: usrProfile,
			ttlFoll: foll,
			ttlfllwd: fllwd,
			ttlPost: pst
		}
		return hasil
    } catch (e) {
        console.log("Terjadi Kesalahan, mungkin akunnya di private, atau memang akunny tidak ada")
    } 
}

igstalk('xyz')