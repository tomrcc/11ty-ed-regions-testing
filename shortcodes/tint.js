/**
 * Tint paired shortcode - wraps content in a colored span
 * 
 * @param {string} content - The content between the opening and closing tags
 * @param {string} tintColor - The color to apply to the text
 * @returns {string} HTML span with the color applied
 */
export default function tint(content, tintColor) {
	return `<span style="color: ${tintColor}">${content}</span>`;
}
