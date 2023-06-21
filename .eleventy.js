module.exports = function (eleventyConfig) {

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
