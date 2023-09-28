module.exports = function (eleventyConfig) {

	// Add pass-through copy for static assets

	eleventyConfig.addPassthroughCopy('assets');
	eleventyConfig.addPassthroughCopy("js");
	eleventyConfig.addPassthroughCopy("css");

	// Add a slugify filter to eleventyConfig
	const slugify = require('slugify');
	eleventyConfig.addFilter('slugify', function (str) {
		return slugify(str, {
			lower: true,
			replacement: '-'
		});
	});

	eleventyConfig.addLayoutAlias('default', 'layouts/default.njk');
	return {
		htmlTemplateEngine: 'njk',
		dir: {
			includes: "../includes",
			layouts: "../layouts",
			input: "pages",
			output: "dist",
			data: "../data"
		}
	};
}
