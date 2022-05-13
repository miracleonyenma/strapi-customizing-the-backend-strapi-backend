module.exports = {
  routes: [
    {
      method: "POST",
      path: "/orders/confirm/:id",
      handler: "order.confirmOrder",
    }
  ]
}