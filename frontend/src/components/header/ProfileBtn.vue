<template>
	<router-link class="profile-btn" :to="{ name: 'LoginPage', params: {} }">
		<span><i class="fi fi-br-portrait"></i></span>
	</router-link>
</template>

<script>

export default {
	name: "ProfileBtn",

};
</script>

<style lang=scss>
.profile-btn {
	text-decoration: none;
	display: flex;
	justify-content: center;
	margin: 0 0px 0 10px;

	span {
		display: grid;
		align-items: center;
		justify-content: center;
		width: 80px;
		height: 40px;
		border-radius: 6px;
		background-image: linear-gradient(to right,
				#ff24a7,
				#8890fe);
		cursor: pointer;
		user-select: none;

		i {

			display: grid;
			align-items: center;
			font-size: 1.8rem;
			color: white;
			transition: ease-in-out 0.2s;
			margin-top: 1px;

		}

		&:hover {
			background-image: linear-gradient(to right,
					#ff24a78a,
					#8890fe90);

			i {
				color: var(--light-pink);
			}
		}
	}

	@media (min-width: 200px) and (max-width: 700px) {

		margin: 10px 10px 0 10px;

		span {

			width: 50px;
			height: 40px;

			i {
				font-size: 1.6rem;
			}
		}
	}
}
</style>