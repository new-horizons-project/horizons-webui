<template>
	<div id="swagger"></div>
</template> 

<script setup lang="ts">

import { SwaggerUIBundle } from "swagger-ui-dist";
import "swagger-ui-dist/swagger-ui.css";
import "../swagger-dark.css"
import { onMounted } from 'vue';

const swaggerUrl = import.meta.env.VITE_NH_API_URL + 'openapi.json';

onMounted(() => {
	SwaggerUIBundle({
		dom_id: '#swagger',
		url: swaggerUrl
	});
});

</script>

<style lang="scss">
.scheme-container {
	background: none !important;
}

article div {
	color: #b5bac9 !important;
}

article svg, .authorization__btn {
	filter: invert(1);
}
</style>