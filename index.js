const bacnet = require("bacstack");
const client = new bacnet({ apduTimeout: 6000 });

const getObjectList = (host, type, instance) => {
  return new Promise((resolve, reject) => {
    client.readProperty(
      host,
      { type: type, instance: instance },
      enums.PropertyId.objectList,
      (err, value) => {
        if (err) resolve({ result: "error", error: err });
        else resolve({ result: "value-received", data: value.values });
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

export { getObjectList, getObjectName };
