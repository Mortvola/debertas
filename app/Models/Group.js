'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Group extends Model {
    categories() {
        return this.hasMany('App/Models/Category');
    }
}

module.exports = Group
