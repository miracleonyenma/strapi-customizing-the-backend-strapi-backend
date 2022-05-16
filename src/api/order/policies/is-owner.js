'use strict';

const utils = require("@strapi/utils")
const {PolicyError} = utils.errors

/**
 * `is-owner` policy.
 */

module.exports = async (policyContext, config, { strapi }) => {
  // Add your own logic here.
  // strapi.log.info('In is-owner policy.');

  // const canDoSomething = true;

  // if (canDoSomething) {
  //   return true;
  // }

  const { id } = policyContext.request.params
  const user = policyContext.state.user
  const order = await strapi.entityService.findOne("api::order.order", id, {
    populate: ["owner"]
  })

  // console.log({
  //   order_id: id,
  //   order,
  //   user_id: user.id
  // });

  if(order.owner.id === user.id){
    // Go ahead to excecute
    return true;
  }

  // throw policy error
  throw new PolicyError("Thou shall not pass!")
};
