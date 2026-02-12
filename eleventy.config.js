import { IdAttributePlugin, InputPathToUrlTransformPlugin, HtmlBasePlugin } from "@11ty/eleventy";
import { feedPlugin } from "@11ty/eleventy-plugin-rss";
import pluginSyntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import pluginNavigation from "@11ty/eleventy-navigation";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import editableRegions from "@cloudcannon/editable-regions/eleventy";

import pluginFilters from "./_config/filters.js";

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
export default async function(eleventyConfig) {
	// Drafts, see also _data/eleventyDataSchema.js
	eleventyConfig.addPreprocessor("drafts", "*", (data, content) => {
		if (data.draft) {
			data.title = `${data.title} (draft)`;
		}

		if(data.draft && process.env.ELEVENTY_RUN_MODE === "build") {
			return false;
		}
	});

	// Editable Regions Plugin
	eleventyConfig.addPlugin(editableRegions, {
			output: "_site/live-editing.js",
			verbose: true,
			liquid: {
				component_dirs: ["_includes"],
				component_extensions: [".liquid", ".html"],
				components: [
					// Core components
					{ name: "simple", file: "_includes/components/simple.liquid" },
					{ name: "nested/parent", file: "_includes/components/nested/parent.liquid" },
					{ name: "nested/child", file: "_includes/components/nested/child.liquid" },
					{ name: "spread-test", file: "_includes/components/spread-test.liquid" },
					// Filter test components
					{ name: "builtin-filters", file: "_includes/components/builtin-filters.liquid" },
					{ name: "array-filters", file: "_includes/components/array-filters.liquid" },
					{ name: "date-filter", file: "_includes/components/date-filter.liquid" },
					{ name: "json-filter", file: "_includes/components/json-filter.liquid" },
					{ name: "filter-chaining", file: "_includes/components/filter-chaining.liquid" },
					{ name: "additional-filters", file: "_includes/components/additional-filters.liquid" },
					// Control flow components
					{ name: "control-flow", file: "_includes/components/control-flow.liquid" },
					{ name: "forloop-test", file: "_includes/components/forloop-test.liquid" },
					{ name: "cycle-test", file: "_includes/components/cycle-test.liquid" },
					{ name: "tablerow-test", file: "_includes/components/tablerow-test.liquid" },
					{ name: "loop-control", file: "_includes/components/loop-control.liquid" },
					// Tag test components
					{ name: "variable-tags", file: "_includes/components/variable-tags.liquid" },
					{ name: "raw-comment", file: "_includes/components/raw-comment.liquid" },
					{ name: "whitespace-control", file: "_includes/components/whitespace-control.liquid" },
					{ name: "include-variations", file: "_includes/components/include-variations.liquid" },
					{ name: "liquid-tag", file: "_includes/components/liquid-tag.liquid" },
					{ name: "render-tag", file: "_includes/components/render-tag.liquid" },
					// Custom extension components
					{ name: "with-filter", file: "_includes/components/with-filter.liquid" },
					{ name: "with-shortcode", file: "_includes/components/with-shortcode.liquid" },
					{ name: "with-tag", file: "_includes/components/with-tag.liquid" },
				],
				filters: [
					{
						name: "customFilter",
						file: "filters/customFilter.js",
					},
					{
						name: "reverseString",
						file: "filters/reverseString.js",
					},
				],
				paired_shortcodes: [
					{
						name: "tint",
						file: "shortcodes/tint.js",
					},
				],
				custom_tags: [
					{
						name: "shout",
						file: "tags/shout.js",
					},
				],
		}
	});

	// Copy the contents of the `public` folder to the output folder
	// For example, `./public/css/` ends up in `_site/css/`
	eleventyConfig
		.addPassthroughCopy({
			"./public/": "/"
		})
		.addPassthroughCopy("./content/feed/pretty-atom-feed.xsl");

	// Run Eleventy when these files change:
	// https://www.11ty.dev/docs/watch-serve/#add-your-own-watch-targets

	// Watch CSS files
	eleventyConfig.addWatchTarget("css/**/*.css");
	// Watch images for the image pipeline.
	eleventyConfig.addWatchTarget("content/**/*.{svg,webp,png,jpg,jpeg,gif}");

	// Per-page bundles, see https://github.com/11ty/eleventy-plugin-bundle
	// Bundle <style> content and adds a {% css %} paired shortcode
	eleventyConfig.addBundle("css", {
		toFileDirectory: "dist",
		// Add all <style> content to `css` bundle (use <style eleventy:ignore> to opt-out)
		// Supported selectors: https://www.npmjs.com/package/posthtml-match-helper
		bundleHtmlContentFromSelector: "style",
	});

	// Bundle <script> content and adds a {% js %} paired shortcode
	eleventyConfig.addBundle("js", {
		toFileDirectory: "dist",
		// Add all <script> content to the `js` bundle (use <script eleventy:ignore> to opt-out)
		// Supported selectors: https://www.npmjs.com/package/posthtml-match-helper
		bundleHtmlContentFromSelector: "script",
	});

	// Official plugins
	eleventyConfig.addPlugin(pluginSyntaxHighlight, {
		preAttributes: { tabindex: 0 }
	});
	eleventyConfig.addPlugin(pluginNavigation);
	eleventyConfig.addPlugin(HtmlBasePlugin);
	eleventyConfig.addPlugin(InputPathToUrlTransformPlugin);

	eleventyConfig.addPlugin(feedPlugin, {
		type: "atom", // or "rss", "json"
		outputPath: "/feed/feed.xml",
		stylesheet: "pretty-atom-feed.xsl",
		templateData: {
			eleventyNavigation: {
				key: "Feed",
				order: 4
			}
		},
		collection: {
			name: "posts",
			limit: 10,
		},
		metadata: {
			language: "en",
			title: "Blog Title",
			subtitle: "This is a longer description about your blog.",
			base: "https://example.com/",
			author: {
				name: "Your Name"
			}
		}
	});

	// Image optimization: https://www.11ty.dev/docs/plugins/image/#eleventy-transform
	eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
		// Output formats for each image.
		formats: ["avif", "webp", "auto"],

		// widths: ["auto"],

		failOnError: false,
		htmlOptions: {
			imgAttributes: {
				// e.g. <img loading decoding> assigned on the HTML tag will override these values.
				loading: "lazy",
				decoding: "async",
			}
		},

		sharpOptions: {
			animated: true,
		},
	});

	// Filters
	eleventyConfig.addPlugin(pluginFilters);

	eleventyConfig.addPlugin(IdAttributePlugin, {
		// by default we use Eleventy’s built-in `slugify` filter:
		// slugify: eleventyConfig.getFilter("slugify"),
		// selector: "h1,h2,h3,h4,h5,h6", // default
	});

	eleventyConfig.addShortcode("currentBuildDate", () => {
		return (new Date()).toISOString();
	});

	// Custom filters for testing
	eleventyConfig.addLiquidFilter("customFilter", (value) => `filtered: ${value}`);
	eleventyConfig.addLiquidFilter("reverseString", (str) => String(str).split('').reverse().join(''));
	
	// Custom paired shortcode for testing
	eleventyConfig.addPairedLiquidShortcode("tint", (content, color) => {
		return `<span style="color: ${color}">${content}</span>`;
	});
	
	// Custom tag for testing
	eleventyConfig.addLiquidTag("shout", (liquidEngine) => {
		return {
			parse: function(tagToken, remainingTokens) {
				this.str = tagToken.args;
			},
			render: function(context) {
				return Promise.resolve(this.liquid.evalValue(this.str, context)
					.then(str => String(str).toUpperCase()));
			}
		};
	});

	// NOTE: Editable Regions plugin has been moved to the top of the config (after drafts preprocessor)
	// for debugging purposes. See line ~60.

	// Features to make your build faster (when you need them)

	// If your passthrough copy gets heavy and cumbersome, add this line
	// to emulate the file copy on the dev server. Learn more:
	// https://www.11ty.dev/docs/copy/#emulate-passthrough-copy-during-serve

	// eleventyConfig.setServerPassthroughCopyBehavior("passthrough");
};

export const config = {
	// Control which files Eleventy will process
	// e.g.: *.md, *.njk, *.html, *.liquid
	templateFormats: [
		"md",
		"njk",
		"html",
		"liquid",
		"11ty.js",
	],

	// Pre-process *.md files with: (default: `liquid`)
	markdownTemplateEngine: "njk",

	// Pre-process *.html files with: (default: `liquid`)
	htmlTemplateEngine: "njk",

	// These are all optional:
	dir: {
		input: "content",          // default: "."
		includes: "../_includes",  // default: "_includes" (`input` relative)
		data: "../_data",          // default: "_data" (`input` relative)
		output: "_site"
	},

	// -----------------------------------------------------------------
	// Optional items:
	// -----------------------------------------------------------------

	// If your site deploys to a subdirectory, change `pathPrefix`.
	// Read more: https://www.11ty.dev/docs/config/#deploy-to-a-subdirectory-with-a-path-prefix

	// When paired with the HTML <base> plugin https://www.11ty.dev/docs/plugins/html-base/
	// it will transform any absolute URLs in your HTML to include this
	// folder name and does **not** affect where things go in the output folder.

	// pathPrefix: "/",
};
