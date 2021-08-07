const express = require("express")
const router = new express.Router()
const serve = require("../controller/index")

router.post("/signup", serve.signup)

router.post("/login", serve.login)

router.post("/create_event", serve.create_event)

router.put("/update_event/:eventName/:city", serve.update_event)

router.delete("/delete_event/:eventName/:city", serve.Delete_event)

router.get("/search/:eventName/:city", serve.Search_event)

router.get("/all_event", serve.all_event)

router.get("/fetch_all_user", serve.fetch_all_user)

router.get("/fetch_user_and_events", serve.fetch_user_and_event)

router.get("/fetch_events/:userName", serve.fetch_event_by_user)

module.exports = router