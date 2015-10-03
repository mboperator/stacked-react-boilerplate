import fs from 'fs';
import q from 'q';

export default function(fixturesDirectory) {
  let deferred = q.defer();

  fs.readdir(fixturesDirectory, (err, files) => {
    if (err) { return deferred.reject(err); }

    let parsedData = files.reduce((memo, file) => {
      const resourceName = file.replace('.json', '');
      const resourceData = require(`${fixturesDirectory}/${file}`);

      memo[resourceName] = resourceData;
      memo.resources = memo.resources.concat(resourceName);
      return memo;
    }, {resources:[]});

    return deferred.resolve(parsedData);
  });

  return deferred.promise;
}