const express = require('express');
const req = require('express/lib/request');

// FAKE DATABASE
let tasks = [];
// APP
const app = express();

app.use(express.json());

// insert / post
app.post("/tasks", (req, res) => {
    const {code, description, status} = req.body;
    const task = {code, description, status};
    const found = tasks.find(task => task.code === code)
    
    if (found == undefined){
        if (!code || !description || !status){ 
            res.status(404).json("All fields must be filled")
        }else{
            tasks.push(task);
            return res.status(201).json(task);
        }
    }else{
        res.status(404).json("existing code")
    }

    
});

// list / get
app.get("/tasks", (req, res) => {
    const alltasks = tasks
    if (!alltasks){
        return res.status(404).json("tasks not found")
    }else{
        return res.status(200).json(alltasks) 
    }    

})
// list / get specific
app.get("/tasks/:task_code",(req, res) => {
    const { task_code } = req.params
    const task = tasks.find((task) => task.code === task_code)
    if (!task) res.status(404).json("task not found")
    return res.status(200).json(task)
})
// delete 
app.delete("/tasks/:task_code", (req, res)=>{
    const {task_code} = req.params
    const found = tasks.find(task => task.code === task_code)

    if (found != undefined){
        const filteredtasks = tasks.filter(task => task.code !== task_code)
        tasks = filteredtasks
        return res.status(200).json("task deleted")    
    }else{ 
        return res.status(404).json("task not found")    
    }

})
// update
app.patch("/tasks/:task_code",(req, res) => {
    const { task_code } = req.params
    const { description, status } = req.body
    const task = tasks.find(task => task.code === task_code)
    
    if (!task){
        return res.status(404).json("task not found")
    }else{
        task.code = task.code
        task.description = description ? description: task.description
        task.status = status ? status: task.status
        return res.status(200).json(task)
    }

})

// RODAR SERVIDOR
app.listen(3333, () => console.log("Server is running"));