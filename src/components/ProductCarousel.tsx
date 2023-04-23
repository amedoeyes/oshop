import styles from "./ProductCarousel.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

export default function ProductCarousel() {
	const { product } = useSelector((state: RootState) => state.product);
	const images = product?.images || [];

	return (
		<Carousel
			className={styles.productImages}
			autoPlay
			stopOnHover
			emulateTouch
			infiniteLoop
			showStatus={false}
			showArrows={false}
			showIndicators={false}
		>
			{images.map((image, index) => {
				return (
					<img
						key={index}
						className={styles.productImage}
						src={image}
						alt={`Image ${index + 1}`}
					/>
				);
			})}
		</Carousel>
	);
}
