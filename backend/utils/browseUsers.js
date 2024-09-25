const User = require('../models/User');
const connectBdd = require('../utils/connectBdd');
const { ObjectId } = require('mongodb');

module.exports = async function browseUsers (req, res) {

	console.log("req.username", req.query.username);

	await connectBdd();
	const { location, tags, ageGap, fameRatingGap, filterBy, sortBy } = req.query;

	// const user = await User.findOne({username: req.username});
	const user = await User.findOne({username: req.query.username});
	if (!user) {
	return res.status(404).json({ message: "User not found" });
	}

	const userLocation = user.location.coordinates;
	const userTags = user.interests;
	const userAge = user.age;
	const userFameRating = user.fameRating;
	const locationForQuery = location ? location : userLocation;

	const pipeline = [];

	if (user.sexualPreferences === 'Male' || user.sexualPreferences === 'Female'){
		pipeline.push(
		{
			$match: {
				gender: user.sexualPreferences
			}
		});
	}

	const id = new ObjectId(user._id)
	const locationCoordinates = user.location.coordinates;

	pipeline.push(
	{
		$match: {
			$and: [
				{ ready : true },
				{ _id: { $nin: [id] } },
				{ likedBy: { $nin: [id] } },
				{ match: { $nin: [id] } },
				{ viewedBy: { $nin: [id] } },
				{ blacklist: { $nin: [id] } },
			],
		},
	},
	{
		$addFields: {
			fameRatingGap: {
				$abs: { $subtract: ["$fameRating", user.fameRating] }
			},
			// distance: {
			// 	$sqrt: {
			// 		$add: [
			// 			{ $pow: [{ $subtract: ["$location.coordinates.0", locationCoordinates[0]] }, 2] },
			// 			{ $pow: [{ $subtract: ["$location.coordinates.1", locationCoordinates[1]] }, 2] }
			// 		]
			// 	}
			// },
			commonTags: {
				$size: {
					$setIntersection: [
						"$interests",
						userTags
					]
				}
			}
		}
	},
	{
		$sort: {
			commonTags: -1,       // Premier critère : plus de tags communs
			// distance: 1,          // Deuxième critère : distance plus proche
			fameRatingGap: 1      // Troisième critère : fameRatingGap plus faible
		}
	});

	// Application du filtre
	if (filterBy && filterBy.type === "age") {
		pipeline.push(
			{
				$match: {
					age: {
						$eq: userAge
					}
				}
			}
		);
	} else if (filterBy && filterBy.type === "fameRating") {
		pipeline.push(
			{
				$match: {
					fameRating: {
						$gte: userFameRating + filterBy.value,
						$lte: userFameRating - filterBy.value
					}
				}
			}
		);
	} else if (filterBy && filterBy.type === "tags") {
		pipeline.push(
			{
				$match: {
					interests: {
						$in: filterBy.value
					}
				}
			}
		);
	} else if (filterBy === "location") {
		pipeline.push(
			{
				$match: {
					location: {
						$near: {
							$geometry: {
								type: "Point",
								coordinates: userLocation
							},
							$maxDistance: filterBy.value
						}
					}
				}
			}
		);
	}

	// Application des gaps
	if (ageGap && ageGap.min || ageGap && ageGap.max)
	{
		const ageRange = {};
		if (ageGap.min) ageRange.$gte = ageGap.min;
		if (ageGap.max) ageRange.$lte = ageGap.max;
		pipeline.push({
			$match: {
				age: ageRange
			}
		});
	}
	if (fameRatingGap && fameRatingGap.min || fameRatingGap && fameRatingGap.max)
	{
		const fameRatingRange = {};
		if (fameRatingGap.min) fameRatingRange.$gte = fameRatingGap.min;
		if (fameRatingGap.max) fameRatingRange.$lte = fameRatingGap.max;
		pipeline.push({
			$match: {
				fameRating: fameRatingRange
			}
		});
	}
	if (tags)
	{
		const tagsArray = tags.split(",");
		pipeline.push({
			$match: {
				interests: {
					$in: tagsArray
				}
			}
		});
	}
	if (location)
	{
		pipeline.push({
			$match: {
				location: {
					$near: {
						$geometry: {
							type: "Point",
							coordinates: locationForQuery
						}
					}
				}
			}
		});
	}

	// tri final
	if (sortBy === "age") {
		pipeline.push({
			$sort: {
				age: 1
			}
		});
	} else if (sortBy === "fameRating") {
		pipeline.push({
			$sort: {
				fameRating: -1
			}
		});
	} else if (sortBy === "location") {
		pipeline.push({
			$sort: {
				location: 1
			}
		});
	} else if (sortBy === "commonTags") { // a voir si c'est juste
		pipeline.push({
			$sort: {
				commonTags: -1
			}
		});
	}

	// limiter le nombre de résultats
	pipeline.push({
		$limit: 10
	});

	pipeline.push({
		$project: {
			_id: 0,
			password: 0,
			verified: 0,
			refreshToken: 0,
			reported: 0,
			blackList: 0,
			viewedBy: 0,
			likedBy: 0,
			matcha: 0,
			notifications: 0,
			updateAt: 0,
			__v: 0,
			fameRatingGap: 0,
			commonTags: 0
		}
	});

	const getUsers = await User.aggregate(pipeline);
	if (!getUsers) {
		return res.status(404).json({ message: "No users found" });
	}

	return res.status(200).json({ users: getUsers });
};