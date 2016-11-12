const expect = require('chai').expect;
const jsonfile = require('jsonfile')
var file = 'test/testdata/github_response.json'
 
const testData = jsonfile.readFileSync(file);

const _APP_DIR = './../src/';
const Parser = require(_APP_DIR + 'modules/githubParser');



describe('When parsing GitHub events response', function () {
  let result;
  before(function setUp () {
    result = Parser.parse(testData);
  })
  it('Should return list of features on which the Developer has been working', function () {
    expect(result).to.be.instanceOf(Array);
    expect(result[0]).to.contain.all.keys(['project', 'branch'])

    expect(result[0].project).to.be.equal('pomodevro');
  })

  it('Should return list of commits for each feature', function () {
    expect(result[0].project).to.be.equal('pomodevro');
  })
});