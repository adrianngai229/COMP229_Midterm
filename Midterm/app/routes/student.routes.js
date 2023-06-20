module.exports = (app) => {
    const students = require('../controllers/student.controller.js');

    app.get('/students', students.fetchAll);

    app.get('/students/:id', students.fetchSingle);

    app.post('/students', students.add);

    app.put('/students/:id', students.update);

    app.delete('/students/:id', students.delete);

}