const Knex = require('knex')
const connection = require('../knexfile')
const knex = Knex(connection["development"])
const jwt = require("jsonwebtoken")



exports.signup = (req, res) => {
    knex("userDetail").insert({
        UserName: req.body.name,
        Email_id: req.body.email,
        Phone_number: req.body.phone,
        Role: req.body.role
    }).then(() => {
        const tokon = jwt.sign({ Email_id: req.body.email }, "amishavishwakarma");
        res.cookie('jwt', tokon, { httpOnly: true, secure: true, maxAge: 3600000 });
        res.status(200).send("you have signup sucessfully");
    }).catch((err) => {
        res.send(err)
    })
}

exports.login = (req, res) => {
    knex("userDetail").select("Email_id").where({ Email_id: req.body.email }).then((result) => {
        if (result.length != 0) {
            const tokon = jwt.sign({ Email_id: req.body.email }, "amishavishwakarma");
            res.cookie('jwt', tokon, { httpOnly: true, secure: true, maxAge: 3600000 });
            res.status(200).send("you have login sucessfully")
        }
        else {
            res.status(400).send("you have to signup first")
        }
    }).catch((err) => {
        res.send(err)
    })
}

exports.create_event = (req, res) => {
    let tokon_created = req.headers.authorization;
    if (tokon_created) {
        tokon_created = tokon_created.split(' ')[1]
        slice_tokon = tokon_created.slice(4, tokon_created.length - 1)
        let decoded = jwt.decode(slice_tokon, "amishavishwakarma");
        req.decoded = decoded;
        knex.select("Id").from("userDetail").where({ Email_id: decoded.Email_id })
            .then((result) => {
                if (result.length != 0) {
                    knex("events").insert({
                        eventName: req.body.eventName,
                        description: req.body.description,
                        startdate: req.body.sDate,
                        endDate: req.body.eDate,
                        city: req.body.city,
                        user_id: result[0]["Id"]
                    })
                        .then((result_ev) => {
                            const tokon = jwt.sign({ eventName: req.body.eventName, city: req.body.city, user_Id: result[0]["Id"] }, "vishwakarmavish");
                            res.cookie('jwtevent', tokon, { httpOnly: true, secure: true, maxAge: 3600000 })
                            res.status(200).send("event has been created");
                        }).catch((err) => {
                            res.status(400).send(err);
                        })
                }
                else {
                    res.status(400).send("you cannot create events")
                }
            }).catch((err) => {
                res.send(err)
            })
    } else {
        res.status(401).send("not authorized")
    }
}

exports.update_event = (req, res) => {
    let created_tokon = req.headers.authorization
    if (created_tokon) {
        sliced_tokon = created_tokon.split(' ')[1];
        sliced_tokon = sliced_tokon.slice(9, sliced_tokon.length - 1)
        let decoded = jwt.decode(sliced_tokon, "vishwakarmavish");
        req.decoded = decoded;
        let event_name = req.params.eventName
        let city_name = req.params.city
        console.log(decoded.user_Id)
        knex.select("user_id").from("events").where({ eventName: event_name } && { city: city_name })
            .then((result) => {
                console.log(result)
                if (result.length != 0) {
                    console.log(result[0]["user_id"])
                    knex.select("Id").from("userDetail").where({ Id: decoded.user_Id })
                        .then((result_ud) => {
                            console.log(result_ud[0]["Id"])
                            if (result[0]["user_id"] == result_ud[0]["Id"]) {

                                knex("events").where({ eventName: event_name } && { city: city_name }).update({

                                    eventName: req.body.eventName,
                                    description: req.body.description,
                                    startdate: req.body.sDate,
                                    endDate: req.body.eDate,
                                    city: req.body.city

                                })
                                    .then((result_ev) => {
                                        res.status(200).send("the data has been updated ")
                                    })
                                    .catch((err) => {
                                        res.send(err)
                                    })
                            }
                            else {
                                res.send("you cannot update this")
                            }
                        }).catch((err) => {
                            res.send(err)
                        })
                }
                else {
                    res.send("there is no such data")
                }


            })
            .catch((err) => {
               
                res.send(err)
            })
    }
    else {
        res.status(401).send("not authorized")
    }

}

exports.Delete_event = (req, res) => {
    let created_tokon = req.headers.authorization

    if (created_tokon) {
        sliced_tokon = created_tokon.split(' ')[1]
        sliced_tokon = sliced_tokon.slice(9, sliced_tokon.length - 1)
        let decoded = jwt.decode(sliced_tokon, "vishwakarmavish");
        req.decoded = decoded;
        let event_name = req.params.eventName
        let city_name = req.params.city
        knex("events").where({ eventName: event_name } && { city: city_name }).select("user_id")
            .then((result) => {
                if (result.length != 0) {
                    console.log(result[0]["user_id"])
                    knex("userDetail").where({ Id: decoded.user_Id }).select("Id")
                        .then((result_ud) => {
                            console.log(result_ud[0]["Id"])
                            if (result[0]["user_id"] == result_ud[0]["Id"]) {

                                knex("events").where({ eventName: event_name } && { city: city_name }).del()
                                    .then((result) => {

                                        res.status(200).send("event has been deleted")


                                    }).catch((err) => {
                                        res.send(err)
                                    })
                            }
                            else {
                                res.status(400).send("you cannot Delete this")
                            }
                        })
                        .catch((err) => {
                            res.send(err)
                        })
                }
                else {
                    res.send("there is no such data")
                }


            })
            .catch((err) => {
                res.send("you cannot delete the data")
            })
    }
    else {
        res.status(401).send("not varified")
    }
}

exports.Search_event = (req, res) => {
    let event_name = req.params.eventName
    let city_name = req.params.city
    knex("events").where({ eventName: event_name } && { city: city_name }).select("*")
        .then((result) => {
            console.log(result)
            if (result.length != 0) {
                res.send(result)
            }
            else {
                res.send("no such events are there")
            }
        }).catch((err) => {
            res.send(err)
        })
}

exports.all_event = (req, res) => {
    knex.select("*").from("events").orderBy('eventName', 'asc')
        .then((result) => {
            if (result.length != 0) {
                res.status(200).send(result)
            }
            else {
                res.send("no events")
            }
        }).catch((err) => {
            res.send(err)
        })
}

exports.fetch_all_user = (req, res) => {
    let created_tokon = req.headers.authorization
    if (created_tokon) {
        slice_tokon = created_tokon.split(' ')[1]
        slice_tokon = slice_tokon.slice(4, slice_tokon.length - 1)
        let decoded = jwt.decode(slice_tokon, "amishavishwakarma");
        req.decoded = decoded;
        knex("userDetail").where({ Email_id: decoded.Email_id }).select("Role")
            .then((result) => {
                if (result.length != 0) {
                    user_role = result[0]["Role"]
                    console.log(user_role)
                    if (user_role == "admin") {
                        knex("userDetail").where({ Role: "user" }).select("*")
                            .then((data) => {
                                res.status(200).send(data)
                            })
                            .catch((err) => {
                                res.send(err)
                            })
                    }
                    else {
                        res.send("you are not admin")
                    }
                }
                else {
                    res.send("no events")
                }
            }).catch((err) => {
                res.send(err)
            })

    } else {
        res.status(401).send("not authorized")
    }
}



exports.fetch_user_and_event = (req, res) => {
    let created_tokon = req.headers.authorization
    if (created_tokon) {
        slice_tokon = created_tokon.split(' ')[1]
        slice_tokon = slice_tokon.slice(4, slice_tokon.length - 1)
        let decoded = jwt.decode(slice_tokon, "amishavishwakarma");
        req.decoded = decoded;
        knex("userDetail").where({ Email_id: decoded.Email_id }).select("Role")
            .then((result) => {
                if (result.length != 0) {
                    user_role = result[0]["Role"]
                    if (user_role == "admin") {
                        knex.select("userDetail.username", "events.eventName").from("userDetail")
                            .innerJoin("events", "events.user_id", "=", "userDetail.Id")
                            .then((result) => {
                                res.status(200).send(result)
                            })
                            .catch((err) => {
                                res.send(err)
                            })
                    }
                    else {
                        res.send("you are not admin")
                    }
                }
                else {
                    res.send("no events")
                }
            }).catch((err) => {
                res.send(err)
            })

    } else {
        res.status(401).send("not authorized")
    }
}

exports.fetch_event_by_user = (req, res) => {
    let created_tokon = req.headers.authorization
    if (created_tokon) {
        slice_tokon = created_tokon.split(' ')[1]
        slice_tokon = slice_tokon.slice(4, slice_tokon.length - 1)
        user_name = req.params.userName
        let decoded = jwt.decode(slice_tokon, "amishavishwakarma");
        req.decoded = decoded;
        knex("userDetail").where({ Email_id: decoded.Email_id } && { userName: user_name })
            .then((result) => {
                if (result.length != 0) {
                    user_role = result[0]["Role"]
                    if (user_role == "user") {
                        knex.select("events.eventName").from("userDetail")
                            .innerJoin("events", "events.user_id", "=", "userDetail.Id")
                            .then((result) => {
                                res.status(200).send(result)
                            })
                            .catch((err) => {
                                res.send(err)
                            })
                    }
                    else {
                        res.send("you are not user")
                    }
                }
                else {
                    res.send("no events")
                }
            }).catch((err) => {
                res.send(err)
            })

    } else {
        res.status(401).send("not authorized")
    }

}