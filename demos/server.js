let express = require('express');
let app = express();
let path = require('path');
let bodyParser = require('body-parser');
let constellation = require('../lib/constellation');

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
app.set('json spaces', 1);

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(express.static(__dirname + '/static'));
// app.use(express.static(__dirname + '/static/css'));
// app.use(express.static(__dirname + '/static/js'));
app.use(express.static(__dirname + '/../lib/'));

const server = app.listen(8080, "http://constellationcad.org", function () {
  console.log('Listening on constellationcad.org:%d', server.address().port);
});

app.get('/', function(req,res) {
  res.sendFile((path.join(__dirname + '/static/client.html')));
});

app.post('/postSpecs', async function(req,res) {
  let designName = req.body.designName || 'constellation-design';
  let langText = req.body.specification;
  let categories = req.body.categories;
  let numDesigns = req.body.numDesigns || 20;
  let maxCycles = req.body.maxCycles || 0;
  let representation = req.body.representation || 'EDGE';
  console.log('---Received new input---');
  console.log('Design Name: ', designName);
  console.log('Specification: ', langText);
  console.log('Categories: ', categories);
  console.log('numDesigns: ', numDesigns);
  console.log('maxCycles: ', maxCycles);
  console.log('Representation:', representation);

  let data;
  try {
    data = await constellation.goldbar(langText, categories,
      {designName: designName,
      numDesigns: numDesigns,
      maxCycles: maxCycles,
      representation: representation,
  });
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(405).send(String(error));
  }
});

// app.post('/importSBOL', xmlparser(), async function(req,res) {
app.post('/importSBOL', async function(req,res) {
  let sbolDocs = req.body.sbol;
  let combineMethod = req.body.combineMethod || '';
  let tolerance = req.body.tolerance || 0;
  let representation = req.body.representation || 'EDGE';
  console.log('---Received new input---');
  console.log('combineMethod: ', combineMethod);
  console.log('tolerance: ', tolerance);
  console.log('representation: ', representation);

  let data;
  try {
    data = await constellation.sbol(sbolDocs, combineMethod, tolerance, representation);
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send(String(error));
  }
});
