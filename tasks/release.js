'use strict';

const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');
const semver = require('semver');
const Promise = require('bluebird');
const _ = require('lodash');

const readFileAsync = Promise.promisify(fs.readFile);
const writeFileAsync = Promise.promisify(fs.writeFile);
const execAsync = Promise.promisify(childProcess.exec);

const PACKAGE_JSON = 'package.json';
const WORKING_DIR = path.resolve(__dirname, '../');

function exec(command, options) {
  return execAsync(command, options || {cwd: WORKING_DIR});
}

function buildDevelopment() {
  return Promise.coroutine(function*() {
    console.log('Building project...');
    yield exec('npm run build');
  })();
}

function updateVersion(versionType) {
  return Promise.coroutine(function*() {
    console.log('Updating version...');
    const projectPackage = JSON.parse(yield readFileAsync(path.join(WORKING_DIR, PACKAGE_JSON), 'utf8'));
    console.log(`Current version is ${projectPackage.version}`);
    const nextVersion = semver.inc(projectPackage.version, versionType);
    console.log(`Next version is ${nextVersion}`);
    projectPackage.version = nextVersion;
    yield writeFileAsync(PACKAGE_JSON, projectPackage);
    return nextVersion;
  })();
}

function commitFiles(version) {
  return Promise.coroutine(function*() {
    console.log('Committing files...');
    yield exec(`git commit -am "Release v${version}"`);
  })();
}

function createRelease(version) {
  return Promise.coroutine(function*() {
    console.log(`Creating release ${version}...`);
    yield exec(`git checkout -b r/${version}`);
  })();
}

function finalizeRelease(version) {
  return Promise.coroutine(function*() {
    console.log(`Finalizing release ${version}...`);
    yield exec(`git tag ${version}`);
  })();
}

function pushTag() {
  return Promise.coroutine(function*() {
    console.log('Pushing tag to remote...');
    yield exec('git push --tags');
  })();
}

function pushFiles() {
  return Promise.coroutine(function*() {
    console.log('Pushing commits to remote...');
    yield exec('git checkout master && git pull origin master');
    yield exec('git push origin master');
  })();
}

// Run this if call directly from command line
if (require.main === module) {
  let versionType = process.argv[2];
  if (!versionType || ['patch', 'major', 'minor'].indexOf(versionType) === -1) {
    console.log('Usage:');
    console.log('npm run release patch|major|minor');
    process.exit(1);
  }
  Promise.coroutine(function*() {
    try {
      yield buildDevelopment();
      const version = yield updateVersion();
      yield commitFiles(version);
      yield createRelease(version);
      yield finalizeRelease(version);
      yield pushTag();
      yield pushFiles();
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  })();
}
