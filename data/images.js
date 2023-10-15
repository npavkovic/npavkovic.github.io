const cloudinary = require("cloudinary").v2;

cloudinary.config({
	cloud_name: "dhenrau1q",
	api_key: "587886426691953",
	api_secret: "nfEQI6Nrhs0IW0y-2P_nikwNHPM",
});

module.exports = function () {
	const theImages = {};
	let imageCount = 0;

	return cloudinary.api
		.resources({
			tags: true,
			context: true,
			type: "upload",
			prefix: "portfolio",
			max_results: 500,
		})
		.then((images) => {
			imageCount = 0;
			for (let image of images.resources) {
				const theTag = image.tags && image.tags.length > 0 ? image.tags[0] : "notag";
				theImages[theTag] = theImages[theTag] || [];

				// Grouped image?
				if (image.context?.custom?.groupWith) {
					// console.log("Grouped image", image.context?.custom?.groupWith, "Main?", !!image.context?.custom?.groupMain);
					const existingGroup = theImages[theTag].find((theImage) => {
						// console.log(theImage.groupWith, image.context?.custom?.groupWith);
						return theImage.groupWith === image.context?.custom?.groupWith;
					});
					if (existingGroup) {
						// console.log("Adding to existing group", existingGroup.title);
						existingGroup.urls.push(cloudinary.url(image.public_id, { secure: true }));
						// Is this the group's main image? Then it has the meta data used for the group
						if (image.context?.custom?.groupMain) {
							Object.assign(existingGroup, {
								title: image.context?.custom?.caption || "",
								description: image.context?.custom?.alt || "",
								eyebrow: image.context?.custom?.eyebrow || "",
								tag: image.tags && image.tags.length > 0 ? image.tags[0] : "",
								order: parseInt(image.context?.custom?.order) || 100,
								groupWith: image.context?.custom?.groupWith || "",
							});
						}
						continue; // Skip the rest of the loop. We're done with this image.
					}
				}

				const theUrl = cloudinary.url(image.public_id, { secure: true });

				theImages[theTag].push({
     title: image.context?.custom?.caption || "",
     description: image.context?.custom?.alt || "",
     eyebrow: image.context?.custom?.eyebrow || "",
     tag: image.tags && image.tags.length > 0 ? image.tags[0] : "",
     urls: [theUrl],
     order: parseInt(image.context?.custom?.order) || 100,
     groupWith: image.context?.custom?.groupWith || "",
     slug: theUrl.split("/").pop(),
     thumbnail: `${theUrl.replace(
      "/upload/",
      `/upload/c_thumb,w_200/`
     )}.jpg`,
    });
			}

			// Sort each tag by order
			imageCount = 0;
			Object.keys(theImages).forEach((tag) => {
				console.log(`
/****/
${tag}
/****/
`);
				theImages[tag].sort((a, b) => {
					return a.order - b.order;
				});

				theImages[tag].forEach((figure) => {
					// Show the image count and the final part of each image's URL (the filename)
					console.log("Figure: ", figure);
					console.log(
						`${++imageCount}. ${figure.urls.map((url) => url.split("/").pop()).join(",")}`
					);
				});
			});
			return { items: theImages, tags: Object.keys(theImages) };
		})
		.catch((err) => console.log(err));
};
