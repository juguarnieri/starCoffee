const { v4: uuid4 } = require("uuid");
class Movie {
    constructor(title, actor, duration, gender = "Unknown") {
        this.id = uuid4();
        this.title = title;
        this.actor = actor;  
        this.duration = duration;
        this.gender = gender;  
    }
}

module.exports = Movie;