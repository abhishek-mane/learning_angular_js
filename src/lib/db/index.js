module.exports = {
    createDb:   require('./create.db'),
    dbConnect:  require('./db.connect'),
    dbDelete:   require('./db.delete'),
    dbExist:    require('./db.exist'),
    dbInsert:   require('./db.insert'),
    dbList:     require('./db.list'),
    dbQuery:    require('./db.query'),
    dbView:     require('./db.view'),
    dbCreateIndex: require('./db.index.create'),
    deleteDb:   require('./delete.db')
}