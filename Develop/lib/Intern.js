// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
const Employee = require('../lib/Employee');

   class Intern extends Employee {
       constructor(name, id, email, school){
           super(name, id, email);
           this.name = name;
           this.id = id;
           this.email = email;
           this.school = school;
           this.role = 'Intern';   
       }
   }

   Intern.prototype.getSchool = function() {
       return this.school; 
   }

// Engineer.prototype.getGithub = function(){
//     return this.github; 
// }


module.exports = {Intern}; 