<template>
	<section v-show="notify"></section>
</template>
<script>
export default {
	data() {
		return {}
	},
	computed: {
		notify() {
			let { error, type, message } = this.$store.state.error;
			if (error) {
				// this.$notify({
				// 	title: type + '警告',
				// 	message: message,
				// 	type: 'warning'
				// });

				this.$message({
					message: message,
					type: 'error'
				});
				this.$store.dispatch('clearError');
			}
			return error;
		}
	},
	methods: {}
}

</script>
