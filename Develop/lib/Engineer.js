// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require('../lib/Employee');


class Engineer extends Employee {
    constructor(name, id, email, gitHub){
        super(name, id, email); 
        this.name = name; 
        this.id = id; 
        this.email = email; 
        this.github = gitHub; 
        this.role = 'Engineer'; 
    }
}

Engineer.prototype.getGithub = function(){
    return this.github; 
}

// const erik = new Engineer('erik', 23, 'erik@gmail.com', 'codingErik'); 

// console.log(erik.userName); 


module.exports = Engineer; 