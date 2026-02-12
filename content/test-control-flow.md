---
layout: layouts/test.njk
permalink: /test-control-flow/
title: Control Flow Test
templateEngineOverride: md,liquid
conditional_data:
  show_content: "true"
  type: "primary"
forloop_data:
  items:
    - "First Item"
    - "Second Item"
    - "Third Item"
    - "Fourth Item"
    - "Fifth Item"
cycle_data:
  items:
    - "Item 1"
    - "Item 2"
    - "Item 3"
    - "Item 4"
    - "Item 5"
    - "Item 6"
tablerow_data:
  items:
    - "A1"
    - "A2"
    - "A3"
    - "A4"
    - "A5"
    - "A6"
    - "A7"
    - "A8"
    - "A9"
    - "A10"
loop_data:
  items:
    - "Item 1"
    - "Item 2"
    - "Item 3"
    - "Item 4"
    - "Item 5"
  nested_items:
    - children: ["A1", "A2", "A3"]
    - children: ["B1", "B2"]
    - children: ["C1", "C2", "C3", "C4"]
---

# {{ title }}

This page tests Liquid control flow structures including conditionals, loops, cycle tags, tablerow tags, and loop control statements.

## Conditional Control Flow

Tests if/elsif/else, unless, and case/when conditional statements for controlling template output based on data values.

<div class="test-container">
  <editable-component data-component="control-flow" data-prop="conditional_data">
    {% include "components/control-flow.liquid", conditional_data %}
  </editable-component>
</div>

## For Loops and forloop Object

Tests for loops with the forloop object properties including index, index0, first, last, length, as well as limit, offset, and reversed modifiers.

<div class="test-container">
  <editable-component data-component="forloop-test" data-prop="forloop_data">
    {% include "components/forloop-test.liquid", forloop_data %}
  </editable-component>
</div>

## Cycle Tag

Tests the cycle tag which cycles through a group of strings and outputs them one at a time for each iteration of a loop.

<div class="test-container">
  <editable-component data-component="cycle-test" data-prop="cycle_data">
    {% include "components/cycle-test.liquid", cycle_data %}
  </editable-component>
</div>

## Tablerow Tag

Tests the tablerow tag which generates HTML table rows with a specified number of columns, including tablerowloop object properties.

<div class="test-container">
  <editable-component data-component="tablerow-test" data-prop="tablerow_data">
    {% include "components/tablerow-test.liquid", tablerow_data %}
  </editable-component>
</div>

## Loop Control

Tests break and continue statements for controlling loop execution, as well as parentloop for accessing outer loop properties in nested loops.

<div class="test-container">
  <editable-component data-component="loop-control" data-prop="loop_data">
    {% include "components/loop-control.liquid", loop_data %}
  </editable-component>
</div>
