const getPushEvents =  (json) => {
  return json.filter(function (value) {
    if (value.type == 'PushEvent') {
      return true;
    };
    return false;
  }); 
};

const getCommits =  (pushEvent) => {
  return pushEvent.payload.commits.map(function (commit) {
    return commit.message
  });  
};

const getProjectName =  pushEvent => pushEvent.repo.name;

const getBranch = pushEvent => pushEvent.payload.ref;

function parse (json) {

  const pushEvents = getPushEvents(json); 
  const res = pushEvents.map(function (pushEvent) {
    return {
      project: getProjectName(pushEvent),
      branch: getBranch(pushEvent),
      commits: getCommits(pushEvent) 
    };
  });
  return res;
};

module.exports.parse = parse;