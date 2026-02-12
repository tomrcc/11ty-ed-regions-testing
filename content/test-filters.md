---
layout: layouts/test.njk
permalink: /test-filters/
title: Liquid Filters Test
templateEngineOverride: md,liquid
filter_data:
  text: "hello world from liquid"
  number: "-42"
  url: "https://example.com?foo=bar&baz=qux"
array_data:
  items:
    - "apple"
    - "banana"
    - "cherry"
    - "apple"
    - "date"
  objects:
    - name: "Alice"
      age: "30"
    - name: "Bob"
      age: "25"
    - name: "Charlie"
      age: "35"
date_data:
  date: "2024-03-15T14:30:00Z"
json_data:
  data:
    name: "Test Object"
    count: "42"
    active: "true"
    tags:
      - "liquid"
      - "eleventy"
      - "cloudcannon"
chaining_data:
  text: "  This is a test string for filter chaining  "
additional_data:
  text: "  test string with spaces  "
  html: "<p>This is <strong>HTML</strong> content with <a href='#'>a link</a></p>"
  long_text: "This is a very long text string that should be truncated when using the truncate or truncatewords filters to test their functionality properly."
---

# {{ title }}

This page tests all Liquid filter functionality including built-in filters, array manipulation, date formatting, JSON output, filter chaining, and additional string filters.

## Built-in Liquid Filters

Tests standard Liquid filters like capitalize, upcase, downcase, abs, plus, minus, times, divided_by, escape, and url_encode.

<div class="test-container">
  <editable-component data-component="builtin-filters" data-prop="filter_data">
    {% include "components/builtin-filters.liquid", filter_data %}
  </editable-component>
</div>

## Array Manipulation Filters

Tests array-specific filters including first, last, size, join, reverse, sort, uniq, and map for extracting properties from objects.

<div class="test-container">
  <editable-component data-component="array-filters" data-prop="array_data">
    {% include "components/array-filters.liquid", array_data %}
  </editable-component>
</div>

## Date Formatting Filter

Tests the date filter with various format strings to display dates in different formats.

<div class="test-container">
  <editable-component data-component="date-filter" data-prop="date_data">
    {% include "components/date-filter.liquid", date_data %}
  </editable-component>
</div>

## JSON Output Filter

Tests the json filter for converting Liquid objects to JSON string format.

<div class="test-container">
  <editable-component data-component="json-filter" data-prop="json_data">
    {% include "components/json-filter.liquid", json_data %}
  </editable-component>
</div>

## Multiple Chained Filters

Tests combining multiple filters in sequence, demonstrating how filters can be chained together to transform data.

<div class="test-container">
  <editable-component data-component="filter-chaining" data-prop="chaining_data">
    {% include "components/filter-chaining.liquid", chaining_data %}
  </editable-component>
</div>

## Additional String Filters

Tests additional text manipulation filters including strip, lstrip, rstrip, strip_html, truncate, truncatewords, slice, prepend, append, and replace.

<div class="test-container">
  <editable-component data-component="additional-filters" data-prop="additional_data">
    {% include "components/additional-filters.liquid", additional_data %}
  </editable-component>
</div>
