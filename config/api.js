const site = 'https://amart.janamon.co/'
const json = 'wp-json/wp/v2'
const url = `${site}${json}`

export const NEWS = `${url}/posts`
export const PAGES = `${url}/pages`
export const CATEGORIES = `${url}/categories`
export const USERS = `${url}/users`
export const SUBSCRIBERS = `${site}wp-json/newsletter/v1/subscribers/add`