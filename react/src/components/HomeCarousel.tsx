import { Carousel } from "react-responsive-carousel";
import styles from "./HomeCarousel.module.scss";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useEffect, useState } from "react";
import ProductRating from "./ProductRating";
import ProductPrice from "./ProductPrice";
import axios from "axios";
import fallback from "../assets/fallback.png";

type state = {
	products: Product[];
	status: "loading" | "succeeded" | "failed";
};

export default function HomeCarousel() {
	const [state, setState] = useState<state>({
		products: [],
		status: "loading",
	});

	useEffect(() => {
		axios
			.get("https://dummyjson.com/products/category/laptops")
			.then((res) =>
				setState({ products: res.data.products, status: "succeeded" })
			)
			.catch((err) => setState({ products: [], status: "failed" }));
	}, []);

	return (
		<div className={styles.homeCarousel}>
			{(state.status === "loading" || state.status === "failed") && (
				<div className={styles.homeCarouselSkeleton}></div>
			)}
			{state.status === "succeeded" && (
				<Carousel
					autoPlay
					emulateTouch
					infiniteLoop
					transitionTime={500}
					stopOnHover
					interval={5000}
					showThumbs={false}
					showStatus={false}
					showArrows={false}
				>
					{state.products.slice(0, 4).map((product) => (
						<a
							href={`/product/${product.id}`}
							key={product.id}
							className={styles.homeCarouselProduct}
						>
							<div className={styles.homeCarouselProductDetails}>
								<h1 className={styles.homeCarouselProductTitle}>
									{product.title}
								</h1>
								<ProductRating rating={product.rating} />
								<ProductPrice
									product={product}
									preset="largeInverted"
								/>
							</div>
							<img
								className={styles.homeCarouselProductImage}
								src={product.images[0]}
								alt={product.title}
								loading="lazy"
								onError={(e) =>
									(e.currentTarget.src = fallback)
								}
							/>
						</a>
					))}
				</Carousel>
			)}
		</div>
	);
}
