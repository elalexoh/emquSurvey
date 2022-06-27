module.exports = {
	css: {
		loaderOptions: {
			sass: {
				additionalData: `
          @import "~/assets/styles/main.scss";
        `,
				prependData: `
          @import "~/assets/styles/main.scss";
        `,
				data: '@import "@/assets/styles/_colors.scss";',
			},
		},
	},
};
