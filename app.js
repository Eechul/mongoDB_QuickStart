var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/book_nodejs';

// User connect method to connect to the server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  // insertDocuments(db, function() {
  //   AllfindDocuments(db, function() {
  //     db.close();
  //   });
  // });

  // findDocuments(db, function() {
  //   db.close();
  // });

  // updateDocument(db, function() {
  //   AllfindDocuments(db, function() {
  //     db.close();
  //   });
  // });

  // insertDocuments(db, function() {
  //   removeDocument(db, function() {
  //     db.close();
  //   });
  // });

  insertDocuments(db, function() {
    indexCollection(db, function() {
      db.close();
    });
  });
});

var insertDocuments = function(db, callback) {
  // 도큐먼트 컬랙션을 얻는다
  var collection = db.collection('documents');
  // 몇 가지 도큐먼트를 삽입
  collection.insertMany([
    {a : 1}, {a : 2}, {a : 3}
  ], function(err, result) {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("Inserted 3 documents into the collection");
    callback(result);
  });
};

var AllfindDocuments = function(db, callback) {
  // 도큐먼트 라는 컬랙션 얻는다
  var collection = db.collection('documents');
  // Find some documents
  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs[1]._id.toString());
    callback(docs);
  });
};

var findDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('documents');
  // Find some documents
  collection.find({'a' : 3}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs);
    callback(docs);
  });
};

var updateDocument = function(db, callback) {
  var collection = db.collection('documents');
  collection.updateOne({'a' : 2}
    , { $set: { b : 1 } }, function(err, result) {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    console.log("Updated the document with the field a equal to 2");
    callback(result);
  });
};

var removeDocument = function(db, callback) {
  var collection = db.collection('documents');
  collection.delete({ a : 3 }, function(err, result) {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    console.log("Removed the document with the field a equal to 3");
    callback(result);
  });
};

var indexCollection = function(db, callback) {
  db.collection('documents').createIndex(
    { a : 4 },
      null,
      function(err, results) {
        console.log(results);
        callback();
      }
  );
};
