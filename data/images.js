const cloudinary = require('cloudinary').v2;

cloudinary.config({
	cloud_name: 'dhenrau1q',
	api_key: '587886426691953',
	api_secret: 'nfEQI6Nrhs0IW0y-2P_nikwNHPM'
});

module.exports = function () {

	const theImages = {};
	return cloudinary.api.resources({
		tags: true,
		context: true,
	})
	.then(images => {

			images.resources.forEach( image => {
				const theTag = image.tags && image.tags.length > 0 ? image.tags[0] : 'notag';
				theImages[theTag] = theImages[theTag] || [];
				theImages[theTag].push({
					title: image.context?.custom?.caption || '',
					description: image.context?.custom?.alt || '',
					eyebrow: image.context?.custom?.eyebrow || '',
					tag: image.tags && image.tags.length > 0 ? image.tags[0] : '',
					url: cloudinary.url(image.public_id, { secure: true })
				});
			});
			console.log(theImages);
			return theImages;
		})
		.catch(err => console.log(err));
}