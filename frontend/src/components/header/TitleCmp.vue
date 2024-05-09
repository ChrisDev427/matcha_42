<template>
	<div class="title--header--container">
		<img src="../../../public/src/feu.png" alt="" />
		<router-link class="title--header" :to="{ name: 'HomePage' }">
			<span>
				<h1>matcha</h1>
			</span>
		</router-link>
	</div>
</template>

<script>
export default {
	name: "TitleCmp",
};
</script>

<style lang="scss">
.title--header--container {
	display: flex;
	height: fit-content;

	img {
		margin-left: 9px;
		margin-top: 9px;
		width: 55px;
		height: 55px;
	}

	.title--header {
		height: auto;
		width: auto;
		text-decoration: none;
		margin-top: 10px;

		h1 {
			margin: 6px 0 0 0;
			font-weight: 900;
			font-size: 3rem;

			color: transparent;
			background-image: linear-gradient(to right,
					#ff24a7,
					#8890fe);
			/* Dégradé de couleur */
			-webkit-background-clip: text;
			/* Permet au dégradé de remplir le texte */
			background-clip: text;
		}
	}

	@media (min-width: 200px) and (max-width: 700px) {
		img {

			width: 45px;
			height: 45px;
			margin-top: 10px;
		}

		.title--header {
			h1 {
				font-size: 2.5rem;
			}
		}
	}
}
</style>