---
layout: layouts/test.njk
permalink: /test-tags/
title: Liquid Tags Test
templateEngineOverride: md,liquid
variable_data:
  title: "Test Title"
whitespace_data:
  items:
    - "One"
    - "Two"
    - "Three"
include_data:
  title: "Included Title"
  description: "Included description"
  parent_title: "Parent from variations"
  child_data:
    title: "Nested Child Title"
    content: "Nested child content"
liquid_tag_data:
  title: "Product Name"
  price: "99.99"
---

# {{ title }}

This page tests various Liquid tags including variable tags, raw/comment tags, whitespace control, include variations, the liquid multi-statement tag, and the render tag.

## Variable Tags

Tests assign, capture, increment, and decrement tags for creating and manipulating variables within templates.

<div class="test-container">
  <editable-component data-component="variable-tags" data-prop="variable_data">
    {% include "components/variable-tags.liquid", variable_data %}
  </editable-component>
</div>

## Raw and Comment Tags

Tests the raw tag (which prevents Liquid processing) and comment tag (which hides content from output), including empty data-prop attributes.

<div class="test-container">
  <editable-component data-component="raw-comment" data-prop="raw_data">
    {% include "components/raw-comment.liquid" %}
  </editable-component>
</div>

## Whitespace Control

Tests whitespace control using the dash (-) modifier to strip whitespace before or after Liquid tags.

<div class="test-container">
  <editable-component data-component="whitespace-control" data-prop="whitespace_data">
    {% include "components/whitespace-control.liquid", whitespace_data %}
  </editable-component>
</div>

## Include Variations

Tests different include patterns including standard includes, dynamic path includes using variables, and nested component includes.

<div class="test-container">
  <editable-component data-component="include-variations" data-prop="include_data">
    {% include "components/include-variations.liquid", include_data %}
  </editable-component>
</div>

## Liquid Multi-Statement Tag

Tests the liquid tag which allows multiple Liquid statements to be written in a single tag block for cleaner template code.

<div class="test-container">
  <editable-component data-component="liquid-tag" data-prop="liquid_tag_data">
    {% include "components/liquid-tag.liquid", liquid_tag_data %}
  </editable-component>
</div>

## Render Tag (Isolated Scope)

Tests the render tag which includes a component with isolated variable scope, unlike the standard include tag which shares scope.

<div class="test-container">
  <editable-component data-component="render-tag" data-prop="render_data">
    {% include "components/render-tag.liquid" %}
  </editable-component>
</div>
