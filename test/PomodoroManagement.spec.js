const chaiHttp = require('chai-http'),
  chai = require('chai'),
  expect = chai.expect;

const SERVER = require('../src/pomodevro'),
// const SERVER = 'http://localhost:8080'
  ADAM_COLLECT_ROUTE = '/pomodoro/collect',
  ADAM_EAT_ROUTE = '/pomodoro/eat'
// const EVA_ROUTE = '/pomodoro/collect';

chai.use(chaiHttp)



function when (step) {
  return step()
}

const resetData = () => {
  SERVER.reset()
}


const Adam_reports_finished_pomodoro = () => {
  return chai.request(SERVER)
      .get(ADAM_COLLECT_ROUTE)
}

const Adam_reports_eaten_pomodoros = (eatenPomodoros) => {
  return function () {
    return chai.request(SERVER)
      .post(ADAM_EAT_ROUTE)
      .send({eaten: eatenPomodoros})
  }
}

const Server_returns_collected_pomodoros = (expected) => {
  return function (response) {
    expect(response).to.have.status(200)
    const pomodoros = response.body.pomodoros
    expect(pomodoros.collected).to.be.equal(expected)
  }
}

const Server_returns_eaten_pomodoros = (expected) => {
  return function (response) {
    expect(response).to.have.status(200)
    const pomodoros = response.body.pomodoros
    expect(pomodoros.eaten).to.be.equal(expected)
  }
}

describe('When Adam reports finished pomodoro', () => {

  beforeEach( () => {
    resetData()
  })

  it('Adam should get number of collected and eaten pomodoros', (done) => {
    when(Adam_reports_finished_pomodoro)
      .then(Server_returns_collected_pomodoros(1),
            Server_returns_eaten_pomodoros(0))
      .then(
        when(Adam_reports_finished_pomodoro)
          .then(Server_returns_collected_pomodoros(2),
                Server_returns_eaten_pomodoros(0))
          .then(done)
      )
  })

  it.skip('Adam should get only his not eaten pomodoros', (done) => {
    Given.adamCollectedPomodoro();
    Given.evaCollectsPomodoro();
    Given.adamCollectedPomodoro();
    Given.evaCollectsPomodoro();
    Given.evaCollectsPomodoro();

    chai.request(SERVER)
      .get(ADAM_COLLECT_ROUTE)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.pomodoros).to.be.equal(3);
        done();
    });
  })
})

describe('When Adam reports eaten pomodoros', () => {
  beforeEach( () => {
    resetData()
    when(Adam_reports_finished_pomodoro)
      .then(Adam_reports_finished_pomodoro)
        .then(Adam_reports_finished_pomodoro)
  })

  it('he should get number of collected and eaten pomodoros', (done) => {

    setTimeout( () => {
      when(Adam_reports_eaten_pomodoros(2))
        .then(Server_returns_collected_pomodoros(1),
              Server_returns_eaten_pomodoros(2))
        .then(done)
      }, 100)
  })
})