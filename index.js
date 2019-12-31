const bacnet = require("bacstack");
const client = new bacnet({ apduTimeout: 5000 });

const enums = require("./enums");

const getObjectList = (host, type, instance) => {
  return new Promise((resolve, reject) => {
    client.readProperty(
      host,
      { type: type, instance: instance },
      enums.PropertyId.objectList,
      (err, value) => {
        if (err) reject(err);
        else resolve(value.values);
      }
    );
  });
};

const getObjectName = (host, type, instance) => {
  return new Promise((resolve, reject) => {
    client.readProperty(
      host,
      { type: type, instance: instance },
      enums.PropertyId.objectName,
      (err, result) => {
        if (err) reject(err);
        else resolve(result.values[0].value);
      }
    );
  });
};

const subscribeCOV = (host, type, instance, cancel) => {
  cancel = cancel || false;
  return new Promise((resolve, reject) => {
    client.subscribeCOV(
      host,
      { type: type, instance: instance },
      7,
      cancel,
      false,
      0,
      (err, value) => {
        if (err) reject(err);
        else resolve(value);
      }
    );
  });
};

const onCOV = cb => {
  client.on("covNotifyUnconfirmed", cb);
};

module.exports = { getObjectList, getObjectName, subscribeCOV, onCOV, enums };
