
const { default: knex } = require("knex");

exports.up = function(knex) {
    return knex.schema
    .createTable("userDetail",(table)=>{
        table.increments('Id').primary();
        table.string('UserName',255).notNullable();
        table.string('Email_id',255).notNullable();
        table.string('Phone_number',255).notNullable();
        table.string("Role",255).notNullable();
        table.unique("Email_id")
        // table.enu("Role",['user','admin'],{useNative:false}.defaultTo('user')).notNullable();
         
  
    }).then(()=>{
        return knex.schema
        .createTable('events',(table)=>{
            table.increments('ev_id').primary();
            table.string("eventName",255).notNullable()
            table.string("description",255).notNullable()
            table.string("startdate",255).notNullable()
            table.string("endDate",255).notNullable()
            table.string("city",255).notNullable()
            table.integer("user_id").references("Id").inTable('userDetail').unsigned()

        })
    })

};


exports.down = function(knex) {
    return knex.schema.dropTable("events").then(()=>{
        return knex.schema.dropTable("userDetail")
    })
};