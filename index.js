const express = require('express');
const exphbs = require('express-handlebars');
const pool = require('./db/conn');

const app = express();

// configurar handlebars

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

// reqbody
app.use(express.urlencoded({extended: true}));
app.use(express.json());


// css
app.use(express.static('public'));


app.post('/tarefas/insert', (req, res) => {

    const title = req.body.title;
    const description = req.body.description;

    const sql = `INSERT INTO tarefas (??, ??) VALUES (?, ?)`
    const data = ['title', 'description', title, description];

    pool.query(sql, data, (err) => {
        if(err) {
            console.log(err);
            return;
        }

        res.redirect('/');
    })

});


// PEGAR TODAS TAREFAS
app.get('/tarefas', (req, res) => {

    const sql = `SELECT * FROM tarefas`;
    
    // pegar todas tarefas e renderizar na pagina tarefas
    pool.query(sql, (err, data) => {

        if(err) {
            console.log(err);
            return;
        }

        const tarefas = data;
        res.render('tarefas', {tarefas});
    })
});


// TAREFA INDIVIDUAL 

app.get('/tarefas/:id', (req, res) => {

    const id = req.params.id;

    const sql = `SELECT * FROM tarefas WHERE ?? = ?`;
    const data = ['id', id];

    pool.query(sql, data, (err, data) => {
       
        if(err) {
            console.log(err);
            return;
        }

        const tarefa = data[0]; // pegar o primeiro, no caso como é id tá tudo certo
        res.render('tarefa', { tarefa });

    })
})

// editar tarefa

app.get('/tarefas/edit/:id', (req, res) => {
    
  
   const id = req.params.id;

   const sql = `SELECT * FROM tarefas WHERE ?? = ?`
   const response = ['id', id];

   pool.query(sql, response, (err, data) => {
        if(err) {
            console.log(err);
        }

        const tarefa = data[0]; 
        res.render('tarefasedit', { tarefa });

   })
    
});


app.post('/tarefas/edit', (req, res) => {

    const id = req.body.id;
    const title = req.body.title;
    const description = req.body.description;
   
    const sql = `UPDATE tarefas SET ?? = ?, ?? = ? WHERE ?? = ?`
    const response = ['title', title, 'description', description, 'id', id];

    pool.query(sql, response, (err) => {
        if(err) {
            console.log(err);
            return;
        }

        res.redirect('/tarefas');
    })
})

app.post('/tarefas/remove/:id', (req, res) => {
    
    const id = req.params.id;

    const sql = `DELETE FROM tarefas WHERE ?? = ?`
    const response = ['id', id];

    pool.query(sql, response, (err) => {
        if(err) {
            console.log(err);
        }

        res.redirect('/tarefas');
    })
})

app.get('/', (req, res) => {

    res.render('home');
})


app.listen(3000, () => {
    console.log('Server rodando');
})
