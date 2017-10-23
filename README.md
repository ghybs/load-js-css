# Load JS CSS

Dynamically load external JavaScript and/or Stylesheets into your page.

Useful when these assets are not statically known, but determined at runtime.

[![GitHub releases](https://img.shields.io/github/release/ghybs/load-js-css.svg?label=GitHub)](https://github.com/ghybs/load-js-css/releases)
[![npm](https://img.shields.io/npm/v/load-js-css.svg)](https://www.npmjs.com/package/load-js-css)



## API Reference

| Method  | Returns  | Description |
| :------ | :------- | :---------- |
| **loadJsCss.list**(`<resourceSpec[]>` resources, `<listOptions>` options?) | _N/A_ | Loads the given list of resources. Each resource **must** specify its `type` field in `resourceSpec`. |
| **loadJsCss.js**(`<resourceSpec>` resource) | _N/A_ | Loads the given script. |
| **loadJsCss.css**(`<resourceSpec>` resource) | _N/A_ | Loads the given stylesheet. |


### resourceSpec

Hash map / dictionary with following keys:

| Key  | Type  | Description |
| :--- | :---- | :---------- |
| **type** | `"script"` or `"stylesheet"` | Used by `loadJsCss.list` to determine the type of resource. Must be specified for `loadJsCss.list` |
| **path** | String | URL (relative or absolute) to the resource. When relative, relative to the current script location. |
| **attrs**? | Object | Hash map / dictionary of extra attributes to apply to the `<script>` or `<link>` tag. E.g. for SRI (integrity and crossorigin attributes). |
| **async**? | Boolean | For script only. Default: `false` (in order to emulate `defer` attribute and maintain a more predictable behaviour, by ensuring execution order is the same as list order) |


### listOptions

Hash map / dictionary with following keys:

| Key  | Type  | Description |
| :--- | :---- | :---------- |
| **delayScripts**? | Number or `false` | Defer loading of scripts after stylesheets, by the given duration (in milliseconds). Useful to try to delay scripts execution _after_ stylesheets are ready (but not bullet proof). |



## License
[![license](https://img.shields.io/github/license/ghybs/load-js-css.svg)](LICENSE)

This library is distributed under the [ISC license](https://choosealicense.com/licenses/isc/).
