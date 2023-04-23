import {
	DriveEta,
	House,
	Laptop,
	LocalFlorist,
	ShoppingBag,
	Smartphone,
	Spa,
	Watch,
	Weekend,
} from "@mui/icons-material";
import HomeCarousel from "../components/HomeCarousel";
import styles from "./Home.module.scss";
import ProductsSlider from "../components/ProductsSlider";

export default function Home() {
	return (
		<div className={styles.homePage}>
			<HomeCarousel />

			<div className={styles.homePageCategories}>
				<a
					href="/products?category=smartphones"
					className={styles.homePageCategory}
				>
					<Smartphone />
					<p>Smartphones</p>
				</a>
				<a
					href="/products?category=laptops"
					className={styles.homePageCategory}
				>
					<Laptop />
					<p>Laptops</p>
				</a>
				<a
					href="/products?category=fragrances"
					className={styles.homePageCategory}
				>
					<LocalFlorist />
					<p>Fragrances</p>
				</a>
				<a
					href="/products?category=skincare"
					className={styles.homePageCategory}
				>
					<Spa />
					<p>Skincare</p>
				</a>
				<a
					href="/products?category=home-decoration"
					className={styles.homePageCategory}
				>
					<House />
					<p>Decorations</p>
				</a>
				<a
					href="/products?category=furniture"
					className={styles.homePageCategory}
				>
					<Weekend />
					<p>Furniture</p>
				</a>
				<a
					href="/products?category=mens-watches"
					className={styles.homePageCategory}
				>
					<Watch />
					<p>Watches</p>
				</a>
				<a
					href="/products?category=womens-bags"
					className={styles.homePageCategory}
				>
					<ShoppingBag />
					<p>Bags</p>
				</a>
				<a
					href="/products?category=automotive"
					className={styles.homePageCategory}
				>
					<DriveEta />
					<p>Automotive</p>
				</a>
			</div>

			<div>
				<h1>Featured</h1>
				<ProductsSlider category="tops" title="Tops" />
				<ProductsSlider category="womens-bags" title="Bags" />
				<ProductsSlider category="sunglasses" title="Sunglasses" />
				<ProductsSlider category="mens-watches" title="Watches" />
				<ProductsSlider category="smartphones" title="Smartphones" />
			</div>
		</div>
	);
}
