# constellation-js

[![Build Status](https://travis-ci.org/hicsail/constellation-js.svg?branch=master)](https://travis-ci.org/hicsail/constellation-js) [![npm version](https://badge.fury.io/js/constellation-js.svg)](https://badge.fury.io/js/constellation-js)[![Coverage Status](https://coveralls.io/repos/github/hicsail/constellation-js/badge.svg?branch=master)](https://coveralls.io/github/hicsail/constellation-js?branch=master)

### Latest stable version available at [ConstellationCAD](http://constellationcad.org/)

## Usage
### Requirements

[![node](https://user-images.githubusercontent.com/7750862/70819282-d5ad4a80-1da3-11ea-8f65-dcf2468c74ef.png)](https://nodejs.org/en/download/) [![python](https://user-images.githubusercontent.com/7750862/70819279-d3e38700-1da3-11ea-9321-309ec4d3cc51.png)](https://www.python.org/downloads/)

### Local UI
```shell
git clone git@github.com:hicsail/constellation-js.git
npm install && npm run build && npm run start
```
Then open `http://localhost:8082/` on browser

### Docker UI
```shell
git clone git@github.com:hicsail/constellation-js.git
docker build . -t constellation
docker run -d -p 8082:8082 constellation:latest
```
Then open `http://localhost:8082/` on browser

### NPM Package

The package can be installed in the following way.
```shell
npm install constellation-js
```
It is possible to generate a collection of designs that match a specification using graph construction and traversals.
```javascript
const constellation = require('constellation-js');
let goldbar = '{PT7_a then galK}';
let categories = {
	"PT7_a":{
	  "promoter": [
	    "PT7_WTa",
	    "PT7_3a",
	    "PT7_1a"
	    ]
      },
	"galK":{
	  "cds": [
	    "galK"
	    ]
      }
}
let result = constellation.goldbar(goldbar, categories, {designName: 'my-first-design'});
// result.stateGraph, result.designs, result.sbol, result.messages
```
|Optional parameters| Description|
|--|--|
|`designName`|Name of design space for SBOL output, defaults is "constellation-design"|
|`numDesigns`|Max number of designs to enumerate, default is 20|
|`maxCycles`|Cycle depth for -orMore operators, default is 0|
|`representation`|Choose between `EDGE` or `NODE` based graph, default is EDGE|

|Output|Description|
|--|--|
|`stateGraph`|See [Graph Data Structure](#Graph-Data-Structure)|
|`designs`|List of enumerated designs|
|`sbol`| See [Synthetic Biology Open Language](#Synthetic-Biology-Open-Language)|
|`messages`| Errors or warnings, if applicable|

It is also possible to generate a collection of designs that match a specification using a purely symbolic approach (note that this approach supports only a tolerance of `0` for the AND operator and does not support the MERGE operator).
```javascript
let result = constellation.symbolic(
               "(one-or-more a) then (one-or-more x)", 
               {"a": {"b": ["c"]}, "x":{"y": ["z1", "z2", "z3"]}}, 
               {"numDesigns": 'all', "maxCycles":7});
```

## Case Studies
GOLDBAR syntax for the case studies described in the manuscript are available [here](demos/static/use-cases) and can be demoed on Constellation's UI via the drop down menu.

## Design Space Representations
Genetic design spaces in Constellation are represented in three ways:
1. GOLDBAR
2. Directed cyclic graph
3. SBOL

### GOLDBAR Syntax
The supported GOLDBAR concrete syntax for genetic design spaces is presented below using extended BNF notation. Notice that `then` and `.` are equivalent, and the delimiters `(`...`)` and `{`...`}` are equivalent.
```
 <seq> ::= <exp> then <seq>
        |  <exp> . <seq>
        |  <exp>

 <exp> ::= <term> or <exp>
        |  <term> and0 <exp>
        |  <term> and1 <exp>
        |  <term> and2 <exp>
        |  <term> merge <exp>
        |  <term>

<term> ::= one-or-more <term>
        |  zero-or-more <term>
        |  zero-or-one <term>
        |  reverse-comp <term>
        |  ( <seq> )
        |  { <seq> }
        |  <atom>

<atom> ::= ([A-Za-z0-9]|-|_)+
```
The JSON schema for the GOLDBAR abstract syntax tree representation (parsed from the concrete syntax presented above) can be found in [`schemas/ast.schema.json`](schemas/ast.schema.json).

### Graph Data Structure
Constellation supports both NODE and EDGE based versions of a design space. Below are examples equivalent to the GOLDBAR specification `promoter then one-or-more CDS then terminator`

|![node-graph](https://user-images.githubusercontent.com/7750862/70357131-21ac3c80-1844-11ea-901f-2a744ce65238.png) | ![edge-graph](https://user-images.githubusercontent.com/7750862/70357132-22dd6980-1844-11ea-8d70-73e28f70c39d.png)|
| ------------- | ------------- |
Visualization of node-based graph| Visualization of edge-based graph

The JSON schema for a design space graph can be found in [`schemas/graph.schema.json`](schemas/graph.schema.json). Below is an example of a node-based graph within a single node in JSON format.
```
{
  "604571a7-9e38-4647-afd0-9546399480b5": {
    "id": "604571a7-9e38-4647-afd0-9546399480b5",
    "text": "root",
    "type": "root",
    "edges": [
      "b79407eb-95f0-4b78-99da-779f2c9cad46",
      "7f6ca2fb-ef67-4687-924c-4285de896877"
    ],
    "operator": ["One"]
  }
}
```

### Synthetic Biology Open Language
[SBOL](https://sbolstandard.org/) is an open standard for the representation of *in silico* biological designs, and the icons used in this tool are provided by [SBOL Visual](https://sbolstandard.org/visual/glyphs/). Design spaces are expressed in SBOL via the `CombinatorialDerivation` extension and can be exported and stored in [Knox](https://github.com/CIDARLAB/knox). This third form of design space representation allows Constellation to be easily integrated in the synthetic biology [community](https://sbolstandard.org/applications/).

### Docker Hub

  + Docker images are built and deployed automatically via Github Actions See `.github/workflows/deploy.yml`.
  + They are published via the [NonaSoftware Docker Hub](https://hub.docker.com/repository/docker/nonasoftware/).
## Tutorials

For more details on how to use Nona's supported software tools check out our [Youtube tutorials](https://www.youtube.com/watch?v=Xq2n-iSfmBE&list=PLJAqoPLx9EE3iKr35HgyxUIvHQcIJGK-7). These are still a work in progress, but we'll be updating them regularly.

## Mission, Values, and Roadmap

For more information about our plans for `Nona` you can read our [home page and DEI](https://nonasoftware.org), which includes more details on our vision for supporting an open-source ecosystem around synthetic biology.
You can see details of [Trello project roadmap here](https://trello.com/nonaresearchfoundation).

## Contributing

Contributions are encouraged! Please read our [contributing guide](./docs/CONTRIBUTING.md) to get started. Given that we're in an early stage, you may want to review our guides as well:

* [Bug reports](./docs/CONTRIBUTING.md#bugs)
* [Feature requests](./docs/CONTRIBUTING.md#features)
* [Pull requests](./docs/CONTRIBUTING.md#pull-requests)

## Code of Conduct

`Nona` has a [Code of Conduct](./docs/CODE_OF_CONDUCT.md) that should be honored by everyone who participates in the `Nona` community.

## Governance

You can learn more about how the `Nona Research Foundation` is organized and managed from our [governance model]() which outlines our roles, responsibilities, and decision making processes, which includes information about, and ways to join the volunteers who help maintain Nona supported software. You can start by taking a look at [Code of Conduct](./docs/CODE_OF_CONDUCT.md) and [contributing guide](./docs/CONTRIBUTING.md). Our CI/CD is automatic to deploy to Amazon's ECS upon merging a pull request into production You can also always ask questions in the [slack developers group](https://join.slack.com/t/nona-network/shared_invite/zt-1etjfumia-3w4JreBT1rw_fQcPLM7dDw).

## help

We're a community over in [Slack for help](https://join.slack.com/t/nona-network/shared_invite/zt-1etjfumia-3w4JreBT1rw_fQcPLM7dDw) and all help and support requests in an appropriate `constellationjs-help` channel. We look forward to interacting with you there. 

Bug reports should be made on our [github issues](https://github.com/nonasoftware/constellation-js/issues/new?template=bug_report.md) using
the bug report template. If you think something isn't working, don't hesitate to reach out - it is probably us and not you!

## LICENSING
Check our [BSD-3 License](./docs/LICENSE)

## institutional and funding partners

![Nona Research Foundation](https://nonasofware.org) 
Want to be included as a partner or sponsor? Reach out to donate@nonasoftware.org