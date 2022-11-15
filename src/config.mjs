export const SITE = {
    name: 'Josa Vicente',
    origin: 'https://josavicente.dev',
    basePathname: '/',

    title: 'Josa Vicente: Engineer Manager + Developer',
    description: 'Josa Vicente blog and profile site with Astro + TailwindCSS',

    googleAnalyticsId: 'G-L55P2CF5BM',
	googleSiteVerificationId: 'uWgm332VIICMLTKxGMAmgjfO-p2CSMvfJq06Fya8QUg',
};

export const BLOG = {
	disabled: false,
	postsPerPage: 4,

	blog: {
		disabled: false,
		pathname: 'blog', // blog main path, you can change this to "articles" (/articles)
	},

	post: {
		disabled: false,
		pathname: '', // empty for /some-post, value for /pathname/some-post 
	},

	category: {
		disabled: false,
		pathname: 'category', // set empty to change from /category/some-category to /some-category
	},

	tag: {
		disabled: false,
		pathname: 'tag', // set empty to change from /tag/some-tag to /some-tag
	},
};