---
layout: layouts/test.njk
permalink: /test-core/
title: Core Features Test
templateEngineOverride: md,liquid
simple_data:
  title: "Simple Component Title"
  description: "This is a simple component with editable text regions"
simple_data_2:
  title: "Second Simple Component"
  description: "Testing same component with different data"
nested_data:
  parent_title: "Parent Component Title"
  child:
    title: "Child Component Title"
    content: "Child component content nested inside parent"
spread_data:
  heading: "Spread Test Heading"
  text: "This component receives data via bind_include which spreads the object properties"
  author: "Test Author"
---

# {{ title }}

This page tests core editable regions functionality including simple components, nested includes, and object spreading with bind_include.

## Simple Component with Basic Editables

Tests basic editable text regions with a simple component containing title and description fields.

<div class="test-container">
  <editable-component data-component="simple" data-prop="simple_data">
    {% include "components/simple.liquid", simple_data %}
  </editable-component>
</div>

## Same Component, Different Data

Tests rendering the same component multiple times with different data to verify component reusability.

<div class="test-container">
  <editable-component data-component="simple" data-prop="simple_data_2">
    {% include "components/simple.liquid", simple_data_2 %}
  </editable-component>
</div>

## Nested Component Includes

Tests parent/child component nesting where a parent component includes a child component using editable-component wrappers.

<div class="test-container">
  <editable-component data-component="nested/parent" data-prop="nested_data">
    {% include "components/nested/parent.liquid", nested_data %}
  </editable-component>
</div>

## Object Spread with bind_include

Tests object spreading functionality using bind_include, which spreads object properties directly onto the component root instead of passing them as named parameters.

<div class="test-container">
  <editable-component data-component="spread-test" data-prop="spread_data">
    {% bind_include "components/spread-test.liquid", spread_data %}
  </editable-component>
</div>
