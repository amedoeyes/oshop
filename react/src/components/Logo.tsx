type LogoProps = {
	width?: number;
	height?: number;
};

export default function Logo({ width = 50, height = 50 }: LogoProps) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width={width} height={height} viewBox="0 0 512 512">
			<g>
				<ellipse
					cx="256"
					cy="256"
					fill="none"
					fillOpacity="1"
					stroke="currentcolor"
					strokeDasharray="none"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeOpacity="1"
					strokeWidth="29.281"
					paintOrder="normal"
					rx="241.359"
					ry="241.359"
				></ellipse>
			</g>
			<g
				strokeDasharray="none"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeOpacity="1"
				paintOrder="normal"
				transform="matrix(.6138 0 0 .6138 117.585 78.284)"
			>
				<path
					fill="none"
					stroke="currentcolor"
					strokeWidth="35.038"
					d="M443.845 406.919H73.736l43.91-85.092h253.076L486.519 157.24H45.663l72.08 164.642"
				></path>
				<ellipse
					cx="117.882"
					cy="478.906"
					fill="currentcolor"
					fillOpacity="1"
					stroke="none"
					strokeWidth="27.655"
					rx="35.527"
					ry="35.527"
				></ellipse>
				<ellipse
					cx="395.529"
					cy="478.906"
					fill="currentcolor"
					fillOpacity="1"
					stroke="none"
					strokeWidth="27.655"
					rx="35.527"
					ry="35.527"
				></ellipse>
				<path
					fill="none"
					fillOpacity="1"
					stroke="currentcolor"
					strokeWidth="35.038"
					d="M71.492 210.225h370.945"
				></path>
				<path
					fill="none"
					fillOpacity="1"
					stroke="currentcolor"
					strokeWidth="35.038"
					d="M99.833 266.824h308.762"
				></path>
				<path
					fill="none"
					fillOpacity="1"
					stroke="currentcolor"
					strokeWidth="35.038"
					d="M56.102 179.017l-37.67-65.247h-63.937"
				></path>
			</g>
		</svg>
	);
}
