import { Star, StarHalf, StarOutline } from "@mui/icons-material";

type ProductRatingProps = {
	rating: number;
};

export default function ProductRating({ rating }: ProductRatingProps) {
	const fullStars = Math.floor(rating);
	const hasHalfStar = rating - fullStars >= 0.5;
	const stars = [];

	for (let i = 0; i < 5; i++) {
		if (i < fullStars) stars.push(<Star key={i} />);
		else if (hasHalfStar && i === fullStars)
			stars.push(<StarHalf key={i} />);
		else stars.push(<StarOutline key={i} />);
	}

	return <div className={"productRating"}>{stars}</div>;
}
