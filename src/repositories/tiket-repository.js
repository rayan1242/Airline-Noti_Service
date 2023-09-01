const CrudRepository = require('./crud-repository')
const { Ticket } = require('../models');
const ticket = require('../models/ticket');

class TicketRepository extends CrudRepository{
    constructor(){
        super(Ticket);

    }

    async getPendingTickets(){
        const response = await ticket.findAll({
               where:{
                status: 'PENDING'
               } 
        });
        return response;
    }
}

module.exports = TicketRepository;