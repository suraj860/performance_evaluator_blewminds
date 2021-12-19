

const {MongoClient} = require ("mongodb")

const MONGODB_URL ="mongodb://localhost:27017";
const MONGODB_NAME = "blueWindsData";

const client = new MongoClient(MONGODB_URL);

module.exports ={
    db: null,
    logIn : null,
    faculty : null,
    async connect(){
        await client.connect()
        console.log("connected to " + MONGODB_URL)
        this.db = client.db(MONGODB_NAME)
        console.log("connected to " + MONGODB_NAME)
        this.logIn = this.db.collection("logIn")
        this.faculty = this.db.collection("faculty")
    }
}

