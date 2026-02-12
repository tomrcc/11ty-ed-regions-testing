/**
 * Custom Liquid tag that converts text to uppercase
 * 
 * Usage: {% shout myVar %} where myVar = "hello" => "HELLO"
 * Usage: {% shout "hello" %} => "HELLO"
 */
export default function(liquidEngine) {
	return {
		parse(tagToken) {
			this.str = tagToken.args;
		},
		
		async render(context) {
			const value = await this.liquid.evalValue(this.str, context);
			return String(value).toUpperCase();
		}
	};
}
