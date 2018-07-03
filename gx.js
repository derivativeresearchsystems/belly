const git = require('simple-git');
const chalk = require('chalk');

const blueGx = chalk.blue('gx');
const texts = {
  genericError: `  💥 ${blueGx}: something went wrong.`,
  commitSuccess: `  ✨ ${blueGx}: commit executed with data`,
};


module.exports = async cli => {
  const {commitMessage} = cli.flags;
  if (isEmptyArray(cli.input)) {
    addAllCommitAndPush(commitMessage);
  }
};

function isEmptyArray(arr) {
  if (Array.isArray(arr)) {
    return arr.length === 0;
  }
  throw new TypeError('Input must be of type Array');
}

function addAllCommitAndPush(commitMessage) {
  git()
    .add('.')
    .commit(
      `gx: ${commitMessage}`,
      (err, data) => {
        if (err) {
          throw new Error(texts.genericError);
        }
        console.info(texts.commitSuccess, data.summary);
      }
    );
}
