'use strict';

/**
 *  order controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::order.order', ({ strapi }) => ({
  confirmOrder: async (ctx, next) => {
    const { id } = ctx.request.params
    console.log(id);

    await strapi.entityService.update("api::order.order", id, {
      data: {
        confirmed: true,
        confirmation_date: new Date()
      }
    })

    //send an email
    // strapi.service("api::order.order").sendEmail(
    //   // order id
    //   id,
    //   // user
    //   ctx.state.user)

    return {
      message: "confirmed"
    }
  },

  async create(ctx, next){
    // // get user from context
    // const user = ctx.state.user

    // // super gives us access to some of the methods available in the core controller
    // // we'll use the create method which returns an objhect with data & meta
    // const {data, meta} = await super.create(ctx)

    // // attach user to data object
    // data.owner = user

    // // return data with user attached and the meat
    // return { data, meta }

    // get user from context
    const user = ctx.state.user

    // get request body data from context
    const { products } = ctx.request.body.data
    console.log(products);

    // use the create method from Strapi enitityService
    const order = await strapi.entityService.create("api::order.order", {
      data: {
        products,
        // pass in the owner id to define the owner
        owner: user.id
      }
    })

    return { order }
  }
}));
