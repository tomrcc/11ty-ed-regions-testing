---
layout: layouts/test.njk
permalink: /test-custom-extensions/
title: Custom Extensions Test
templateEngineOverride: md,liquid
custom_filter_data:
  text: "Hello World"
shortcode_data:
  text: "Colored text example"
custom_tag_data:
  text: "hello from custom tag"
  items:
    - "apple"
    - "banana"
    - "cherry"
---

# {{ title }}

This page tests custom Eleventy/Liquid extensions including custom filters, paired shortcodes, and custom tags that extend Liquid's functionality.

## Custom Filters

Tests custom filters defined in the Eleventy configuration, including customFilter (adds prefix) and reverseString (reverses characters).

<div class="test-container">
  <editable-component data-component="with-filter" data-prop="custom_filter_data">
    {% include "components/with-filter.liquid", custom_filter_data %}
  </editable-component>
</div>

## Custom Paired Shortcodes

Tests custom paired shortcodes that wrap content, like the tint shortcode which applies color styling to enclosed text.

<div class="test-container">
  <editable-component data-component="with-shortcode" data-prop="shortcode_data">
    {% include "components/with-shortcode.liquid", shortcode_data %}
  </editable-component>
</div>

## Custom Liquid Tags

Tests custom Liquid tags created via the Eleventy configuration, like the shout tag which converts text to uppercase.

<div class="test-container">
  <editable-component data-component="with-tag" data-prop="custom_tag_data">
    {% include "components/with-tag.liquid", custom_tag_data %}
  </editable-component>
</div>
